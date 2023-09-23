import supertest from "supertest";

import { expect } from "chai";

const request = supertest("https://gorest.co.in/public-api/");

const TOKEN =
  "0d5486f43754e91ddf75b12af1dc17323b748b5066be95ce1befafed8c8946b6";

describe("users", () => {
  it("GET /users", (done) => {
    request.get(`/users?access-token=${TOKEN}`).end((err, res) => {
      expect(res.body.data).to.not.be.empty;
      done();
    });
  });
});
