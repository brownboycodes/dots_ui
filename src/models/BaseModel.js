class BaseModel {
  constructor(id) {
    if (typeof id !== "number" || !Number.isInteger(id)) {
      throw new Error("ID must be a valid integer.");
    }
    this.id = id;
  }
}

export default BaseModel;
