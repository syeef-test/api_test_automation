import supertest from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://gorest.co.in/public-api/";
const TOKEN =
  "0d5486f43754e91ddf75b12af1dc17323b748b5066be95ce1befafed8c8946b6";

if (!TOKEN) {
  throw new Error(
    "Access token not provided. Please set the USER_TOKEN environment variable."
  );
}

const request = supertest(BASE_URL);

describe("Users API Tests", () => {
  let userId;

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const data = {
        email: `testing-${Math.floor(Math.random() * 9999)}@gmail.com`,
        name: "test2",
        gender: "male",
        status: "active",
      };

      try {
        const response = await request
          .post("users")
          .set("Authorization", `Bearer ${TOKEN}`)
          .send(data);
        expect(response.body.code).to.equal(201); // Assuming a successful POST returns a 201 status code
        expect(response.body.data).to.deep.include(data);
        userId = response.body.data.id;
      } catch (error) {
        throw error;
      }
    });
  });

  describe("GET /users", () => {
    it("should retrieve a list of users", async () => {
      try {
        const response = await request.get(`users?access-token=${TOKEN}`);
        expect(response.status).to.equal(200);
        expect(response.body.data).to.not.be.empty;
      } catch (error) {
        throw error;
      }
    });
  });

  describe("GET /users/:id", () => {
    it("should retrieve a specific user by ID", async () => {
      try {
        const response = await request.get(
          `users/${userId}?access-token=${TOKEN}`
        );

        expect(response.status).to.equal(200);
        expect(response.body.data.id).to.equal(userId);
      } catch (error) {
        throw error;
      }
    });
  });

  describe("GET /users with query params", () => {
    it("should retrieve users with specific query params", async () => {
      const queryParams = {
        page: 1,
        gender: "female",
        status: "active",
      };
      const url = `users?access-token=${TOKEN}&${new URLSearchParams(
        queryParams
      ).toString()}`;

      try {
        const response = await request.get(url);
        expect(response.status).to.equal(200);
        expect(response.body.data).to.not.be.empty;

        response.body.data.forEach((data) => {
          expect(data.gender).to.eq("female");
          expect(data.status).to.eq("active");
        });
      } catch (error) {
        throw error;
      }
    });
  });

  describe("PUT /users/:id", () => {
    it("should update a specific user by ID", async () => {
      const data = {
        status: "active",
        name: `Luffy - ${Math.floor(Math.random() * 9999)}`,
      };

      try {
        const response = await request
          .put(`users/${userId}`)
          .set("Authorization", `Bearer ${TOKEN}`)
          .send(data);

        expect(response.status).to.equal(200);
        expect(response.body.data).to.deep.include(data);
      } catch (error) {
        throw error;
      }
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a specific user by ID", async () => {
      try {
        const response = await request
          .delete(`users/${userId}`)
          .set("Authorization", `Bearer ${TOKEN}`);

        expect(response.body.code).to.equal(204); // Assuming a successful DELETE returns a 204 status code
        expect(response.body.data).to.be.null;
      } catch (error) {
        throw error;
      }
    });
  });
});
