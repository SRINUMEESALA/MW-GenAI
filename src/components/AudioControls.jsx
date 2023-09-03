import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from "react-speech-kit";
import axios from "axios";
import MicIcon from "@mui/icons-material/Mic";
import { Container, Grid, IconButton, Box } from "@mui/material";
import ThinkingBubble from "./ThinkingBubble";
import { useTheme } from "@mui/material/styles";

import SendIcon from "@mui/icons-material/Send";
import {
  TextField, // Add to imports
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import audioWave from "./../assets/images/audio-wave.gif";
let timer;

const AudioControls = ({
  message,
  setMessage,
  isAudioResponse,
  handleSendMessage,
  messages,
  setMessages,
  handleBackendResponse,
}) => {
  const theme = useTheme();
  const [text, setText] = useState("");
  const { speak, cancel, speaking, voices } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setText(result);
    },
  });

  const handleRecording = () => {
    if (listening) {
      stop();
    } else {
      listen();
      cancel();
    }
  };

  const apiCall = async () => {
    // Clear the input field
    setText("");

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: <ThinkingBubble theme={theme} sx={{ marginBottom: "-5px" }} />,
        text: <ThinkingBubble theme={theme} sx={{ marginBottom: "-5px" }} />,
        key: "thinking",
      },
    ]);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://192.168.0.174:5000/",
        { query: text },
        config
      );

      setMessages((prevMessages) => {
        return prevMessages.filter((message) => message.key !== "thinking");
      });
      handleBackendResponse(data);
      speak({ text: data.result, voice: voices[144] });
    } catch (error) {
      console.error("Error sending text message:", error);
    }
  };

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      stop();
      if (text !== "") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "user", content: text, text: text },
        ]);
        apiCall();
      }
    }, 1000);
  }, [text]);

  // message component functions
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} md>
            {/* <div style={{ display: "flex" }}>
              <TextField
                variant="outlined"
                fullWidth
                label="Type your message"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              {message !== "" ? (
                <IconButton
                  color="primary"
                  onClick={() => handleSendMessage(isAudioResponse)}
                  disabled={message.trim() === ""}>
                  <SendIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="primary"
                  aria-label="start recording"
                  onClick={handleRecording}
                  disabled={listening}>
                  <MicIcon style={{ width: 25, height: 48 }} />
                </IconButton>
              )}
            </div> */}

            <FormControl
              sx={{ m: 2, ml: 0, mr: 0, width: "100%" }}
              variant="outlined">
              {/* <InputLabel htmlFor="outlined-adornment-password">
                Type your message
              </InputLabel> */}
              <TextField
                fullWidth
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {message !== "" ? (
                        <IconButton
                          color="primary"
                          onClick={() => handleSendMessage(isAudioResponse)}
                          disabled={message.trim() === ""}>
                          <SendIcon />
                        </IconButton>
                      ) : !listening ? (
                        <IconButton
                          color="primary"
                          aria-label="start recording"
                          onClick={handleRecording}
                          disabled={listening}>
                          <MicIcon style={{ width: 25, height: 25 }} />
                        </IconButton>
                      ) : (
                        <img
                          src={audioWave}
                          style={{
                            height: "25px",
                            width: "25px",
                            marginRight: "8px",
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                label="Type your message"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AudioControls;
