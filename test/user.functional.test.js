import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/server.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("User Routes Functional Tests", () => {
  let testUserId;

  it("Debería crear un nuevo usuario y retornar el usuario creado", async () => {
    const newUser = {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      age: 30,
      password: "password123",
      role: "user"
    };

    const res = await chai.request(app).post("/api/users").send(newUser);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property("user");
    expect(res.body.user).to.have.property("email", newUser.email);
    testUserId = res.body.user._id;
  });

  it("Debería obtener un usuario por ID", async () => {
    const res = await chai.request(app).get(`/api/users/${testUserId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("user");
    expect(res.body.user).to.have.property("email", "johndoe@example.com");
  });
});