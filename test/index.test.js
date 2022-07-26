// imports
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

// Mock values
const API_URL =
  "https://us-west2-connexinterview.cloudfunctions.net/cardactivation";
const MOCKREQ_fail = {
  body: {
    cardnumber: "401214423412340001",
    csv: "2344",
    expirydata: "06248",
    phonenumber: "64712434123",
  },
};
const MOCKREQ_success = {
  body: {
    cardnumber: "4012123412340001",
    csv: "234",
    expirydata: "0628",
    phonenumber: "6471234123",
  },
};
const MOCKDATAFAIL = {
  response: { status: "400", msg: "activation failed", responsecode: "101" },
};
const MOCKDATASUCCESS = {
  response: { status: "200", msg: "activation success", responsecode: "100" },
};

describe("App Home endpoint", () => {
  it("should return a 200 status code", async () => {
    const response = await request.get("/");

    expect(response.statusCode).toBe(200);
  });
});

jest.setTimeout(10000);
describe("App Activation endpoint", () => {
  it("should return a 200 status code", async () => {
    const response = await request.post("/activation").send(MOCKREQ_success);

    expect(response.statusCode).toBe(200);
  });
});

describe("App Activation endpoint", () => {
  it("should return a 200 status code", async () => {
    const response = await request.post("/activation").send(MOCKREQ_fail);

    expect(response.statusCode).toBe(200);
  });
});
