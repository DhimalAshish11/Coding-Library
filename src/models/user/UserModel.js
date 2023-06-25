import UserSchema from "./UserSchema";

export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};
