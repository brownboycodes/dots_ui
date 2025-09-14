import BaseModel from "./BaseModel.js";

class UserModel extends BaseModel {
  constructor({
    id,
    name,
    profilePicture,
    onlineStatus,
    lastSeen,
    accountStatus,
  }) {
    super(id);
    this.name = name;
    this.profilePicture = profilePicture;
    this.onlineStatus = onlineStatus;
    this.lastSeen = lastSeen;
    this.accountStatus = accountStatus;
    this.type = "user";
  }

  static type = "user";

  static fromJson(json) {
    const { id, name, profilePicture, onlineStatus, lastSeen, accountStatus } =
      json;
    return new UserModel({
      id,
      name,
      profilePicture,
      onlineStatus,
      lastSeen: lastSeen ? new Date(lastSeen) : undefined,
      accountStatus,
    });
  }
}

export default UserModel;
