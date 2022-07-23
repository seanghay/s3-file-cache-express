import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import { createHmac } from "node:crypto";
import { putFileBuffer, getFileUrl, fileExists } from './s3.js'

const KEY = "not_key";

function createFilename(filename) {
  return createHmac("sha1", KEY).update(filename).digest("hex") + ".json";
}

const app = express();

app.use(cors());
app.use(helmet());


app.get("/file/:filename", async (req, res) => {
  const filename = createFilename(req.params.filename);
  const exists = await fileExists(filename);
  if (!exists) {    
    const json = JSON.stringify({ created_at: new Date() });
    await putFileBuffer(filename, Buffer.from(json), 'application/json');
  }
  const url = await getFileUrl(filename);
  res.redirect(url);
});

app.use((req, res) => res.status(404).end());

export default app;
