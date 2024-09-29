import { useContext, useEffect } from "react";
import { MicRecorderContext } from "../provider/MicRecorderProvider";
import { OpenAIContext } from "../OpenAIContext";


function SpeechToText({ className }) {
	const { recordedBlob, mediaURL, setTranscription } =
		useContext(MicRecorderContext);
	const openai = useContext(OpenAIContext);

	useEffect(() => {
		if (recordedBlob?.stream) {
			getAiTranscription();
		}
	}, [recordedBlob]);

	const getAiTranscription = async () => {
		const transcription = await openai.audio.transcriptions.create({
			file: new File([recordedBlob], "recording.mp3", { type: "audio/mp3" }),
			model: "whisper-1",
		});

    setTranscription(transcription.text);
	};

	return (
		<div className={className}>
			{mediaURL && <audio controls src={mediaURL}></audio>}
		</div>
	);
}

export default SpeechToText;
