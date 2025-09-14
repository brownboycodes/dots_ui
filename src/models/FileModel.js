import BaseModel from "./BaseModel.js";

class FileModel extends BaseModel {
  constructor({ id, name, fileType, dateAdded, lastEdited, path }) {
    super(id);
    this.name = name;
    this.fileType = fileType;
    this.dateAdded = dateAdded;
    this.lastEdited = lastEdited;
    this.path = path;
    this.type = "file";
  }

  static type = "file";

  static fromJson(json) {
    const { id, name, fileType, dateAdded, lastEdited, path } = json;

    return new FileModel({
      id,
      name,
      fileType,
      dateAdded: dateAdded ? new Date(dateAdded) : undefined,
      lastEdited: lastEdited ? new Date(lastEdited) : undefined,
      path,
    });
  }
}

export default FileModel;
