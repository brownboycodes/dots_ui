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
import ImageItemIcon from "../assets/images/image-item.svg?react";
import MediaItemIcon from "../assets/images/media-item.svg?react";

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
          {isImageFile(item.name) ? (
            <ImageItemIcon style={itemIconStyle} />
          ) : isMediaFile(item.name) ? (
            <MediaItemIcon style={itemIconStyle} />
          ) : (
            <FileItemIcon style={itemIconStyle} />
          )}
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
          in {item.path} • {getDateTime(item.lastEdited)}
        </div>
      </div>
    </>
  );
}

export default File;

// Function to check if file is audio or video
function isMediaFile(fileName) {
  const mediaExtensions = [
    "mp4",
    "mkv",
    "avi",
    "mov",
    "webm",
    "mp3",
    "wav",
    "ogg",
    "flac",
  ];
  const ext = fileName.split(".").pop().toLowerCase();
  return mediaExtensions.includes(ext);
}

// Function to check if file is an image
function isImageFile(fileName) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const ext = fileName.split(".").pop().toLowerCase();
  return imageExtensions.includes(ext);
}
