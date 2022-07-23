import fs from "fs/promises";
import "dotenv/config";
import { Client } from "minio";
import path from "node:path";

const client = new Client({
  endPoint: process.env.S3_ENDPOINT,
  port: parseInt(process.env.S3_PORT),
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  useSSL: process.env.S3_SSL === "true",
});

export const BUCKET_NAME = "files";

export async function putFileBuffer(filename, buffer, contentType) {
  const meta = { "Content-Type": contentType };
  return await client.putObject(BUCKET_NAME, filename, buffer, meta);
}

export async function fileExists(filename) {
  try {
    await client.statObject(BUCKET_NAME, filename);    
    return true;
  } catch {
    return false;
  }
} 

export async function getFileUrl(filename) {
  return await client.presignedGetObject(BUCKET_NAME, filename);
}
