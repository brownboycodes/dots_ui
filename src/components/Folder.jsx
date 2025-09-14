import {
  folderIconBgStyle,
  itemDetailsStyle,
  itemIconBackgroundStyle,
  itemIconContainerStyle,
  itemIconStyle,
  itemMetaStyle,
  itemNameStyle,
} from "../styles/ItemStyles";
import { getDateTime } from "../utils/DateTimeFormatter";
import FolderItemIcon from "../assets/images/folder-item.svg?react";

function Folder({ item }) {
  return (
    <>
      {/* Profile/File Icon Section */}
      <div style={itemIconContainerStyle}>
        <div
          style={{
            ...itemIconBackgroundStyle,
            ...folderIconBgStyle,
          }}
        >
          <FolderItemIcon style={itemIconStyle} />
        </div>
      </div>

      {/* Text Content Section */}
      <div style={itemDetailsStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={itemNameStyle}>{item.name}</div>
        </div>

        <div style={itemMetaStyle}>
          `in ${item.path} • ${getDateTime(item.lastEdited)}`
        </div>
      </div>
    </>
  );
}

export default Folder;
