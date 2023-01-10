const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const request = require("supertest");
const app = require("../../app");
const { User } = require("../../service/schemas/user");
require("dotenv").config();

const { DB_HOST, PORT } = process.env;

describe("test auth login", () => {
  let connection;

  beforeAll(async () => {
    connection = app.listen(PORT);
  });

  afterAll(async () => {
    connection.close();
  });

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  it("test login controller", async () => {
    const userData = {
      email: "kanna@mail.com",
      password: "kanna1234",
    };
    const hashPassword = bcrypt.hashSync("kanna1234", bcrypt.genSaltSync(10));
    const newUser = await User.create({
      email: "kanna@mail.com",
      password: hashPassword,
    });

    const loginData = {
      email: "kanna@mail.com",
      password: "kanna1234",
    };

    const data = await request(app).post("/api/users/login").send(loginData);
    const { body } = data;
    const { token } = await User.findById(newUser._id);

    expect(data.statusCode).toBe(200);
    expect(data.body.token).toBe(token);
    expect(body.user).toEqual({
      email: "kanna@mail.com",
      subscription: "starter",
    });
  });
  it("should throw an error if the password value is empty", async () => {
    const data = await request(app)
      .post("/api/users/login")
      .send({ email: "tanna@mail.com", password: "" });

    expect(data.statusCode).toBe(400);
  });
  it("should throw an error if the email value is empty", async () => {
    const data = await request(app)
      .post("/api/users/login")
      .send({ email: "", password: "tanna1234" });

    expect(data.statusCode).toBe(401);
  });
  it("should throw an error if the email doesn't exist", async () => {
    const data = await request(app)
      .post("/api/users/login")
      .send({ email: "tannaa@mail.com", password: "tanna1234" });

    expect(data.statusCode).toBe(401);
  });
  it("should throw an error if the password is wrong", async () => {
    const data = await request(app)
      .post("/api/users/login")
      .send({ email: "tanna@mail.com", password: "tanna12345" });

    console.log(data);
    expect(data.statusCode).toBe(401);
  });
});
