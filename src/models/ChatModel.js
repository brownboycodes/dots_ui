import BaseModel from "./BaseModel.js";

class ChatModel extends BaseModel {
  constructor({
    id,
    name,
    profilePicture,
    lastMessage,
    lastMessageTime,
    onlineStatus,
    lastSeen,
    accountStatus,
  }) {
    super(id);
    this.name = name;
    this.profilePicture = profilePicture;
    this.lastMessage = lastMessage;
    this.lastMessageTime = lastMessageTime;
    this.onlineStatus = onlineStatus;
    this.lastSeen = lastSeen;
    this.accountStatus = accountStatus;
    this.type = "chat";
  }

  static type = "chat";

  static fromJson(json) {
    const {
      id,
      name,
      profilePicture,
      lastMessage,
      lastMessageTime,
      onlineStatus,
      lastSeen,
      accountStatus,
    } = json;
    return new ChatModel({
      id,
      name,
      profilePicture,
      lastMessage,
      lastMessageTime: lastMessageTime ? new Date(lastMessageTime) : undefined,
      onlineStatus,
      lastSeen: lastSeen ? new Date(lastSeen) : undefined,
      accountStatus,
    });
  }
}

export default ChatModel;
