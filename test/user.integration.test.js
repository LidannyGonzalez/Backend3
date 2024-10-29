import { expect } from "chai";
import { userModel } from "../src/Daos/models/user.model.js";

describe("User DAO Integration Tests", () => {
  let userId = null;

  after(async () => {
    
    if (userId) {
      await userModel.findByIdAndDelete(userId);
    }
  });

  it("Debería crear un nuevo usuario en la base de datos", async () => {
    const newUser = {
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe_integration@example.com",
      age: 28,
      password: "securePassword123",
      role: "user",
    };

    const user = await userModel.create(newUser);
    expect(user).to.be.an("object");
    expect(user.email).to.equal(newUser.email);
    userId = user._id;
  });

  it("Debería obtener un usuario por email", async () => {
    const user = await userModel.findOne({ email: "janedoe_integration@example.com" });
    expect(user).to.be.an("object");
    expect(user.email).to.equal("janedoe_integration@example.com");
  });
});