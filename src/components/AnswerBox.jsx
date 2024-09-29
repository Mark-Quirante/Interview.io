import { useContext, useState } from "react";
import SpeechToText from "./SpeechToText";
import Button from "./Button";
import PencilIcon from "../assets/pencil_icon.svg";
import { MicRecorderContext } from "../provider/MicRecorderProvider";
import MicIcon from "../assets/mic_icon.svg";
import StopIcon from "../assets/stop_icon.svg";

function AnswerBox({ setAnswer, answer }) {
  const { isRecording, recordedBlob, beginRecording, stopRecording, transcription } =
		useContext(MicRecorderContext);
  const [answerType, setAnswerType] = useState("");

  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center">
      <div className="flex items-start my-3">
        {!isRecording ? (
          <Button
            className="mr-2"
            isDisabled={answerType === "type"}
            icon={MicIcon}
            onClick={() => {
              setAnswer("");
              setAnswerType("record");
              beginRecording();
            }}
          >
            Record
          </Button>
        ) : (
          <Button
            className="mr-2"
            onClick={stopRecording}
            icon={StopIcon}
          >
            Stop Recording
          </Button>
        )}
        <Button
          isDisabled={answerType === "record"}
          icon={PencilIcon}
          onClick={() => setAnswerType("type")}
        >
          Type
        </Button>
      </div>
      <div className="flex flex-col flex-1 w-full">
        {answerType === "record" && !answer && <div className="flex flex-col items-center">
          <SpeechToText
              isDisabled={answerType === "type"}
              className="mb-2"
            />
          {recordedBlob?.stream && <button className="text-green font-bold" onClick={() => setAnswer(transcription)}>Save Answer</button>}  
        </div>}
        <textarea
          disabled={answerType === "record"}
          className={
            "transition-all flex-1 w-full " +
            (answerType === "type" || (answerType === "record" && answer) ? "max-h-[2000px]" : "border-none max-h-0")
          }
          value={answer}
          onChange={(e) => answerType === "type" ? setAnswer(e.target.value) : null}
        >
        </textarea>
      </div>
    </div>
  );
}

export default AnswerBox;