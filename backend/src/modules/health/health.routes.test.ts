import request from "supertest";
import express from "express";
import { healthRoutes } from "./health.routes.js";

const app = express();
app.use("/health", healthRoutes);

describe("Health routes", () => {
  it("GET /health/liveness returns 200", async () => {
    const res = await request(app).get("/health/liveness");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: "ok" });
  });
});
