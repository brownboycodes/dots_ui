import BaseModel from "./BaseModel.js";

class FolderModel extends BaseModel {
  constructor({ id, name, fileCount, path, dateAdded, lastEdited }) {
    super(id);
    this.name = name;
    this.fileCount = fileCount;
    this.path = path;
    this.dateAdded = dateAdded;
    this.lastEdited = lastEdited;
    this.type = "folder";
  }

  static type = "folder";

  static fromJson(json) {
    const { id, name, fileCount, path, dateAdded, lastEdited } = json;
    return new FolderModel({
      id,
      name,
      fileCount,
      path,
      dateAdded: dateAdded ? new Date(dateAdded) : undefined,
      lastEdited: lastEdited ? new Date(lastEdited) : undefined,
    });
  }
}

export default FolderModel;
