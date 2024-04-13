- Authentication and authorization is achieved using clerk API.
- Used post-gre SQL (neon db)
  - for pushing tables use this:
  - npx drizzle-kit push:pg
- Used Drizzle (instead of Prisma becuase it is slow and not next edge compatible)
- Used Amazon S3 from file store.
- stripe may ask to authenticate again after sometime please run below command and authenticate again
  - stripe login
  - stripe listen --forward-to localhost:3000/api/webhook (for testing purposes)

**Steps**

1. Obtain the PDF from the user
2. Store the PDF to AWS S3.
3. Obtain the PDF on fly
4. Split and segement the PDF
5. vectorize and embed individual components
6. Store the vectors into pinecode db (vector db).
7. Embed the query
8. query the pinecone db for similar vectors
9. extract out the metadata of similar vectors
10. feed metadata into the openAi promt to generate output.

**Theory:**

**_Vector and Embeddings_**

- transform sentences into vectors
- we can find similarity of two vectors using multiple ways (e.g. cosine similarity)

PINECONE Terms
index -> database
namespace -> segement pdf vector space
