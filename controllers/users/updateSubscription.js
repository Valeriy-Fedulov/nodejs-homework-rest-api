import { User } from "../../models/index.js";

const updateSubscription = async (req, res, next) => {
  const { subscription } = req.query;
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: subscription }
  );
  res.status(200).json({
    message: "Subscription update",
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

export default updateSubscription;
