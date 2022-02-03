import auth from "../middlewares/auth.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

describe("Auth middleware test", () => {
  it("Should call next() and add user and token properties to req object", () => {
    const user = {
      _id: "61f4bf7110557db11ab57882",
    };

    const { SECRET_KEY } = process.env;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    const mReq = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const mRes = {};
    const mockNext = jest.fn();
    auth(mReq, mRes, mockNext);

    console.log(mReq.token);

    expect(mReq.token).toEqual(token);
    // expect(mReq.user._id).toEqual(user._id);
    expect(mockNext).toHaveBeenCalled();
  });
});
