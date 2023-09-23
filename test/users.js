import supertest from "supertest";
import { expect } from "chai";

const request = supertest("https://gorest.co.in/public-api/");

const TOKEN =
  "0d5486f43754e91ddf75b12af1dc17323b748b5066be95ce1befafed8c8946b6";

describe("users", () => {
  it("GET /users", () => {
    return request.get(`/users?access-token=${TOKEN}`).then((res) => {
      expect(res.body.data).to.not.be.empty;
    });
  });

  it("GET /users/:id", async () => {
    const res = await request.get(`/users/628094?access-token=${TOKEN}`);
    expect(res.status).to.equal(200);
    expect(res.body.data.id).to.equal(628094);
  });

  it("GET /users with query params", async () => {
    const queryParams = {
      gender: "female",
      status: "active",
    };
    const url = `/users?access-token=${TOKEN}&${new URLSearchParams(
      queryParams
    ).toString()}`;
    const res = await request.get(url);
    //console.log(res.body);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.not.be.empty;
    res.body.data.forEach((data) => {
      expect(data.gender).to.equal("female");
      expect(data.status).to.equal("active");
    });
  });
});
