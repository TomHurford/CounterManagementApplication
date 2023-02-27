// Testing the user routes

const request = require("supertest");
const app = require("../app.js");
const { faker } = require("@faker-js/faker");
const prisma = require("../../prisma/prisma.js");

// Test the signup route
describe("POST /users/signup", () => {
  test("should create a new user", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
        forename: faker.name.firstName(),
        surname: faker.name.lastName(),
        phoneNumber: faker.phone.imei(),
      })
      .expect(201)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("token");

    // Delete the user from the database
    await prisma.prisma.user.delete({
      where: {
        email: res.body.email,
      },
    });
  });

  test("should return an error if the email already exists", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        email: "admin@admin.com",
        password: "admin",
      })
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error");
  });

  test("should return an error if the email is missing", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        password: "admin",
      })
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error");
  });

  test("should return an error if the password is missing", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        email: faker.internet.email(),
      })
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error");
  });
});

// Test the login route
describe("POST /users/login", () => {
  test("should login a user", async () => {
    const res = await request(app).post("/users/login").send({
      email: "admin@admin.com",
      password: "admin",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("token");
  });

  test("should return an error if the email is missing", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({
        password: "admin",
      })
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error");
  });

  test("should return an error if the password is missing", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({
        email: "admin@admin.com",
      })
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error");
  });

  test("should return an error if the email doesn't exist", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({
        email: faker.internet.email(),
        password: "admin",
      })
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error");
  });

  test("should return an error if the password is incorrect", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({
        email: "admin@admin.com",
        password: "admin123",
      })
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /users/logout", () => {
  test("should logout a user", async () => {
    // Login a user
    const loginRes = await request(app).post("/users/login").send({
      email: "admin@admin.com",
      password: "admin",
    });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty("email");
    expect(loginRes.body).toHaveProperty("token");

    const token = loginRes.body.token;

    const res = await request(app)
      .post("/users/logout")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("message");
  });

  test("should return an error if the user is not logged in", async () => {
    const res = await request(app)
      .post("/users/logout")
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error");
  });

  test("should return an error if the token is invalid", async () => {
    const res = await request(app)
      .post("/users/logout")
      .set("Authorization", `Bearer invalidtoken`)
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error");
  });
});
