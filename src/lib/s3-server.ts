"use server";
import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import os from "os";
import path from "path";

export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: process.env.NEXT_PUBLIC_S3_REGION,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      };

      const obj = await s3.getObject(params);
      const file_name = `/tmp/pdf${Date.now().toString()}.pdf`;

      const dir = path.dirname(file_name);
      console.log("directory where file is being created", file_name);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (obj.Body instanceof require("stream").Readable) {
        const file = fs.createWriteStream(file_name);
        file.on("open", function (fd) {
          // @ts-ignore
          obj.Body?.pipe(file).on("finish", () => {
            console.log("Sending file content...");
            return resolve(file_name);
          });
        });
      }
      return null;
    } catch (error) {
      console.error(error);
      reject(error);
      return null;
    }
  });
}
