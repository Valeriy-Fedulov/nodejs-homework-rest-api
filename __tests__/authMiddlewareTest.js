import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

describe("Auth middleware test", () => {
  it("Should call next() and add user and token properties to req object", () => {
    const user = {
      _id: "1",
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

    expect(mReq.token).toEquel(token);
    expect(mReq.user._id).toEquel(user._id);
    expect(mockNext).toHaveBeenCalled();
  });
});
