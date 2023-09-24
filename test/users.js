// import supertest from "supertest";
// import { expect } from "chai";

// const BASE_URL = "https://gorest.co.in/public-api/";
// const TOKEN =
//   "0d5486f43754e91ddf75b12af1dc17323b748b5066be95ce1befafed8c8946b6";

// const request = supertest(BASE_URL);

// describe("User API Tests", () => {
//   it("GET /users", async () => {
//     const response = await request.get(`/users?access-token=${TOKEN}`);
//     expect(response.status).to.equal(200);
//     expect(response.body.data).to.not.be.empty;
//   });

//   it("GET /users/:id", async () => {
//     const userId = 5188749;
//     const response = await request.get(
//       `/users/${userId}?access-token=${TOKEN}`
//     );
//     expect(response.status).to.equal(200);
//     expect(response.body.data.id).to.equal(userId);
//   });

//   it("GET /users with query params", async () => {
//     const queryParams = {
//       gender: "female",
//       status: "active",
//     };
//     const url = `/users?access-token=${TOKEN}&${new URLSearchParams(
//       queryParams
//     ).toString()}`;
//     const response = await request.get(url);
//     expect(response.status).to.equal(200);
//     expect(response.body.data).to.not.be.empty;
//     response.body.data.forEach((data) => {
//       expect(data.gender).to.equal("female");
//       expect(data.status).to.equal("active");
//     });
//   });

//   it("POST /users", async () => {
//     const data = {
//       email: `testing-${Math.floor(Math.random() * 9999)}@gmail.com`,
//       name: "test2",
//       gender: "male",
//       status: "active",
//     };
//     const response = await request
//       .post("users")
//       .set("Authorization", `Bearer ${TOKEN}`)
//       .send(data);

//     expect(response.status).to.equal(201); // Assuming a successful POST returns a 201 status code
//     expect(response.body.data).to.deep.include(data);
//   });

//   it("PUT /users/:id", async () => {
//     const userId = 5192959;
//     const data = {
//       status: "active",
//       name: `Luffy - ${Math.floor(Math.random() * 9999)}`,
//     };
//     const response = await request
//       .put(`users/${userId}`)
//       .set("Authorization", `Bearer ${TOKEN}`)
//       .send(data);

//     expect(response.status).to.equal(200);
//     expect(response.body.data).to.deep.include(data);
//   });

//   it("DELETE /users/:id", async () => {
//     const userId = 5192958;
//     const response = await request
//       .delete(`users/${userId}`)
//       .set("Authorization", `Bearer ${TOKEN}`);

//     expect(response.status).to.equal(204); // Assuming a successful DELETE returns a 204 status code
//     expect(response.body.data).to.be.null;
//   });
// });
