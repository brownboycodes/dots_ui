import {
  itemDetailsStyle,
  itemIconContainerStyle,
  itemMetaStyle,
  itemNameStyle,
  personImageStyle,
  statusActiveStyle,
  statusDotStyle,
  statusInactiveStyle,
} from "../styles/ItemStyles";
import { getDateTime } from "../utils/DateTimeFormatter";

function Chat({ item }) {
  return (
    <>
      {/* Profile/File Icon Section */}
      <div style={itemIconContainerStyle}>
        <img
          src={item.profilePicture}
          alt={item.name}
          style={personImageStyle}
        />
        <div
          style={{
            ...statusDotStyle,
            ...(item.isActive ? statusActiveStyle : statusInactiveStyle),
          }}
        ></div>
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
          `${item.lastMessage} • ${getDateTime(item.lastMessageTime)}`
        </div>
      </div>
    </>
  );
}

export default Chat;
