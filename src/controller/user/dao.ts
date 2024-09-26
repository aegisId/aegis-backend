import { registerDetails } from "../../model/user";
import { UserModel } from "../../types";

export const getuserDao = async (wallet_address: string) => {
  const user = await registerDetails.findOne({
    wallet_address,
  });
  return user as UserModel;
};

export const getAlluserDao = async () => {
  const user = await registerDetails.find({});
  return user as UserModel[];
};

export const postUserDao = async (recievedData: UserModel) => {
  const user = new registerDetails(recievedData);
  const res = await user.save();
  return res;
};

export const updateUserDao = async (recievedData: UserModel) => {
  const updatedUser = await registerDetails.findOneAndUpdate(
    { wallet_address: recievedData.wallet_address },
    recievedData,
    { new: true },
  );
  return updatedUser;
};
