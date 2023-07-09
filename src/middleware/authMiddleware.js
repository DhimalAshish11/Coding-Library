import { getUserById } from "../models/user/UserModel.js";

export const auth = async (req, res, next) => {
  //let it go for next router
  //or stop here response to client

  try {
    const { authorization } = req.headers;

    const user = await getUserById(authorization);
    console.log(user);

    if (user?._id) {
      user.password = undefined;
      req.userInfo = user;
      return next();
    }

    ///every request have userId
    ///get the user from the database
    //check the role

    res.json({
      status: "error",
      message: "sorry, you do not have permission for this api",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const adminauth = async (req, res, next) => {
  //let it go for next router
  //or stop here response to client

  try {
    const { role } = req.userInfo;
    console.log(role);

    role == "admin"
      ? next()
      : res.json({
          status: "error",
          message: "Not allowed because you are not admin",
        });

    ///every request have userId
    ///get the user from the database
    //check the role
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
