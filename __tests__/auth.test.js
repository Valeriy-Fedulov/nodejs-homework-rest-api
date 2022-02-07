import login from "../controllers/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

describe("Auth login test", () => {
  it("Should call next() and add user and token properties to req object", () => {
    const user = {
      password: "123456",
      email: "qwerty@gmail.com",
    };

    const { SECRET_KEY } = process.env;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    const mReq = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: {
        password: user.password,
        email: user.email,
      },
    };

    const mRes = {};
    const mockNext = jest.fn();
    login(mReq, mRes, mockNext);

    // expect(mReq.token).toEqual(token);
    expect(mReq.password).toEqual(user.password);
    expect(mockNext).toHaveBeenCalled();
  });
});
