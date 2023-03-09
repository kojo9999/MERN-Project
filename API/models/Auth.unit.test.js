const request = require("supertest");
const app = require("../app");

let refreshToken = "";
let id = "";

describe("Authentication routes", () => {
  const user = {
    username: "testuser",
    password: "testpassword",
  };

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(user);

    expect(res.statusCode).toEqual(200);
    expect(res.body.user.username).toEqual(user.username);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });

  it("should not register a user with the same username", async () => {
    const res = await request(app).post("/api/auth/register").send(user);

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual("Username already exists");
  });

  it("should log in an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send(user);

    expect(res.statusCode).toEqual(200);
    expect(res.body.user.username).toEqual(user.username);
    id=res.body.user._id
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
    refreshToken = res.body.refreshToken;
  });

  it("should not log in a non-existent user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "nonexistentuser",
      password: "password",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual("invalid Username");
  });

  it("should not log in a user with an incorrect password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: user.username,
      password: "incorrectpassword",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual("invalid password");
  });

  it("should refresh an access token using a refresh token", async () => {
    const res = await request(app)
      .post("/api/auth/token")
      .set("Authorization", `Bearer ${refreshToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toBeDefined();
  });

  it("should not refresh an access token using an invalid refresh token", async () => {
    const res = await request(app)
      .post("/api/auth/token")
      .set("Authorization", "Bearer invalidtoken");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual("Token Not Found");
  });

  it("should delete a refresh token on logout", async () => {
    const res = await request(app).delete("/api/auth/logout").send({
      refreshToken: refreshToken,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("Token removed");
  });

  it("should not delete a refresh token with an invalid token", async () => {
    const res = await request(app).delete("/api/auth/logout").send({
      refreshToken: "invalidtoken",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("Token removed");
  });

  it('should delete user by id and delete associated refresh tokens', async () => {
    const res = await request(app)
      .delete(`/api/auth/deleteUserById/${id}`)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User deleted');

  });
});
