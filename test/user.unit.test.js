import { assert } from "chai";
import { userDto, resUserDto } from "../src/dtos/user.dto.js";

describe("User DTO", () => {
  it("Debería validar un objeto de usuario válido", () => {
    const validUser = {
      first_name: "John",
      last_name: "Doe",
      email: "johnDoe@example.com",
      age: 30,
      password: "password123",
      role: "user",
    };

    const { error } = userDto.validate(validUser);
    assert.isUndefined(error, "DTO de usuario válido debería ser válido");
  });

  it("Debería transformar el usuario para respuesta", () => {
    const user = { email: "johnDoe@example.com", role: "user", cart: [] };
    const resUser = resUserDto(user);

    assert.equal(resUser.email, user.email);
    assert.equal(resUser.role, user.role);
  });
});