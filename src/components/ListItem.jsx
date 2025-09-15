import ChatModel from "../models/ChatModel";
import FileModel from "../models/FileModel";
import FolderModel from "../models/FolderModel";
import UserModel from "../models/UserModel";
import Chat from "./Chat";
import File from "./File";
import Folder from "./Folder";
import User from "./User";

function ListItem({ item }) {
  if (item.type == UserModel.type) {
    return <User item={item} />;
  } else if (item.type == ChatModel.type) {
    return <Chat item={item} />;
  } else if (item.type == FileModel.type) {
    return <File item={item} />;
  } else if (item.type == FolderModel.type) {
    return <Folder item={item} />;
  } else {
    return <div></div>;
  }
}

export default ListItem;
