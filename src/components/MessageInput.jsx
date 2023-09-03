import React from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  IconButton,
  TextField, // Add to imports
} from "@mui/material";

const MessageInput = ({
  message,
  setMessage,
  isAudioResponse,
  handleSendMessage,
}) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        label="Type your message"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <IconButton
        color="primary"
        onClick={() => handleSendMessage(isAudioResponse)}
        disabled={message.trim() === ""}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
