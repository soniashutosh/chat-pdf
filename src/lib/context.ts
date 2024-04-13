import { convertToAscii } from "./utils";
import { getPineconeClient } from "./pinecone";
import { getEmbeddings } from "./embeddings";

export async function getMathcesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    const client = await getPineconeClient();
    const pineconeIndex = await client.index("chat-pdf");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
    const queryResult = await namespace.query({
      topK: 5, // get top 5 matching vectors.
      vector: embeddings,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (error) {
    console.error("error querying embeddings", error);
    throw error;
  }
}

export async function getContext(query: string, filekey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMathcesFromEmbeddings(queryEmbeddings, filekey);
  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  return docs.join("\n").substring(0, 3000);
}
