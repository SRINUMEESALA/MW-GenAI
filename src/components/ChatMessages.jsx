import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ThinkingBubble from "./ThinkingBubble";
import "./../css/globals.css";

const ChatMessages = ({ messages }) => {
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const theme = useTheme();
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      if (typeof bottomRef.current.scrollIntoViewIfNeeded === "function") {
        bottomRef.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
      } else {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          mt: 4,
          maxHeight: 500,
          minHeight: 500,
          overflow: "auto",
          /* Apply the custom scrollbar styles */
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#A1A1A1",
            borderRadius: "15px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#808080",
          },
        }}>
        <Paper elevation={0} sx={{ padding: 2 }}>
          {messages.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <h1 className="h5 text-secondary">Start a new conversation!</h1>
            </div>
          ) : (
            <List>
              {messages.map((message, index) => (
                <ListItem key={index} sx={{ padding: 0 }}>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary={
                      <MessageWrapper align={message.role}>
                        {message.role === "user" ? (
                          <>
                            <UserMessage theme={theme} audio={message.audio}>
                              {message.text}
                            </UserMessage>
                          </>
                        ) : (
                          <AgentMessage theme={theme}>
                            {message.text}
                          </AgentMessage>
                        )}
                      </MessageWrapper>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}

          <div ref={bottomRef} />
        </Paper>
      </Box>
    </Container>
  );
};

export default ChatMessages;

const UserMessage = styled("div", {
  shouldForwardProp: (prop) => prop !== "audio",
})`
  position: relative;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  padding-right: ${({ theme, audio }) =>
    audio ? theme.spacing(6) : theme.spacing(2)};
  border-radius: 1rem;
  border-top-right-radius: 0;
  align-self: flex-end;
  max-width: 80%;
  word-wrap: break-word;
  margin-bottom: 10px;
`;

const AgentMessage = styled("div")`
  position: relative;
  background-color: ${({ theme }) => theme.palette.grey[300]};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  border-radius: 1rem;
  border-top-left-radius: 0;
  align-self: flex-end;
  max-width: 80%;
  word-wrap: break-word;
  margin-bottom: 10px;
`;

const MessageWrapper = styled("div")`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  justify-content: ${({ align }) =>
    align === "user" ? "flex-end" : "flex-start"};
`;
