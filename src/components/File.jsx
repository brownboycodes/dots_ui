import {
  fileIconBgStyle,
  itemDetailsStyle,
  itemIconBackgroundStyle,
  itemIconContainerStyle,
  itemIconStyle,
  itemMetaStyle,
  itemNameStyle,
} from "../styles/ItemStyles";
import { getDateTime } from "../utils/DateTimeFormatter";
import FileItemIcon from "../assets/images/document-item.svg?react";
import ImageIcon from "../assets/images/image-svgrepo-com.svg?react";

function File({ item }) {
  return (
    <>
      {/* Profile/File Icon Section */}
      <div style={itemIconContainerStyle}>
        <div
          style={{
            ...itemIconBackgroundStyle,
            ...fileIconBgStyle,
          }}
        >
          <FileItemIcon style={itemIconStyle} />
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

export default File;
