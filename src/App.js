import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./App.css";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import AudioControls from "./components/AudioControls";
import MessageInput from "./components/MessageInput";
import ThinkingBubble from "./components/ThinkingBubble";
import Header from "./components/Header";
import audioAnimation from "./../src/assets/speakAnimation.gif";

function App() {
  const theme = useTheme();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isAudioResponse, setIsAudioResponse] = useState(false);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: message, text: message },
      ]);

      // Clear the input field
      setMessage("");

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: (
            <ThinkingBubble theme={theme} sx={{ marginBottom: "-5px" }} />
          ),
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
          { query: message },
          config
        );

        setMessages((prevMessages) => {
          return prevMessages.filter((message) => message.key !== "thinking");
        });
        handleBackendResponse(data);
      } catch (error) {
        console.error("Error sending text message:", error);
        // alert(error);
      }
    }
  };

  const handleBackendResponse = (response) => {
    const generatedText = response.result;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: generatedText,
        text: generatedText,
      },
    ]);
  };

  return (
    <div className="vh-100" style={{ backgroundColor: "#F0F0F0" }}>
      <Header />
      <div className="d-flex">
        <div className="col-3 d-flex justify-content-center align-items-center">
          <img
            src="https://img.freepik.com/free-vector/modern-sale-flyer-template_23-2147946455.jpg?size=626&ext=jpg&ga=GA1.1.905824719.1684755036&semt=ais"
            alt=""
            style={{ width: "135%" }}
          />
        </div>
        <div className="col-6 shadow rounded bg-white mb-2 mt-2">
          <Container maxWidth={false}>
            <ChatHeader />
            <ChatMessages messages={messages} />
            <AudioControls
              messages={messages}
              message={message}
              setMessage={setMessage}
              setMessages={setMessages}
              handleSendMessage={handleSendMessage}
              handleBackendResponse={handleBackendResponse}
              setIsAudioResponse={setIsAudioResponse}
            />
            {/* <MessageInput
        message={message}
        setMessage={setMessage}
        setIsAudioResponse={setIsAudioResponse}
        handleSendMessage={handleSendMessage}
      /> */}
            {/* <ResponseFormatToggle
        isAudioResponse={isAudioResponse}
        setIsAudioResponse={setIsAudioResponse}
      /> */}
          </Container>
        </div>
        <div className="col-3 p-3 text-secondary d-flex justify-content-center align-items-center">
          <img src={audioAnimation} alt="" style={{ width: "200px" }} />
        </div>
      </div>
      <p
        style={{
          position: "absolute",
          bottom: "5px",
          right: "20px",
          opacity: 0.4,
        }}
        className="text-secondary">
        @Orahi 2023 All rights reserved!
      </p>
    </div>
  );
}

export default App;
