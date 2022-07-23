import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("request", () => {
  it("should 404", async () => {
    await request(app)
      .get("/")
      .expect(404)
    });
});
