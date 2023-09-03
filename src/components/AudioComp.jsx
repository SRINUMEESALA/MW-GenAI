import React, { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from "react-speech-kit";
let timer;
const VoiceBot = () => {
  const [text, setText] = useState("");
  const [convArray, setConvArray] = useState([]);
  const { speak, cancel, speaking } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // result is the total text of one speech
      setText(result);
      setConvArray([...convArray, result]);
    },
  });

  const sentMsgToBackend = async () => {
    // make api call and update state
    // setText(response.text);
  };

  useEffect(() => {
    sentMsgToBackend();
  }, [convArray]);

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      stop();
    }, 1000);

    // console.log(text);
  }, [text]);

  const handleRecording = () => {
    if (listening) {
      stop();
    } else {
      listen();
      cancel();
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center vh-100">
      <div className="text-center card m-3 shadow p-5 col-5">
        <div className="">
          <button
            onClick={() => speak({ text })}
            className="btn btn-primary w-50 ">
            {speaking ? "Speaking" : "Speak"}
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={handleRecording}
            //   onMouseDown={listen}
            //   onMouseUp={stop}
            className={
              listening ? "btn btn-success mt-4" : "btn btn-warning mt-4"
            }>
            {listening ? "Listening..." : "Tell me something"}
          </button>
        </div>
      </div>
      <div className=" col-5 card shadow p-5 m-3">
        <h1 className="text-primary h4 text-center">Chat</h1>
        {convArray.map((each, index) => (
          <div className="" key={index}>
            <p className="text-success">{each}</p>
            <p className="text-right text-secondary">
              {" "}
              Hey i am currently offline....!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceBot;