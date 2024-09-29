import { useContext, useState } from "react";
import { OpenAIContext } from "./OpenAIContext";
import SpeechToText from "../src/components/SpeechToText";

export default function Interview() {
	const openai = useContext(OpenAIContext);

	const [interviewAnswer1, setInterviewAnswer1] = useState("");
	const [interviewAnswer2, setInterviewAnswer2] = useState("");
	const [interviewAnswer3, setInterviewAnswer3] = useState("");
	const [interviewAnswer4, setInterviewAnswer4] = useState("");
	const [interviewAnswer5, setInterviewAnswer5] = useState("");

	const [currentQuestion, setCurrentQuestion] = useState(1);

	// Helper function to go to the next question
	const nextQuestion = () => {
		if (currentQuestion < 5) {
			setCurrentQuestion(currentQuestion + 1);
		}
	};

	// Render the appropriate SpeechToText component based on the current question
	const renderCurrentQuestion = () => {
		switch (currentQuestion) {
			case 1:
				return (
					<SpeechToText setAnswer={setInterviewAnswer1} questionNumber={1} />
				);
			case 2:
				return (
					<SpeechToText setAnswer={setInterviewAnswer2} questionNumber={2} />
				);
			case 3:
				return (
					<SpeechToText setAnswer={setInterviewAnswer3} questionNumber={3} />
				);
			case 4:
				return (
					<SpeechToText setAnswer={setInterviewAnswer4} questionNumber={4} />
				);
			case 5:
				return (
					<SpeechToText setAnswer={setInterviewAnswer5} questionNumber={5} />
				);
			default:
				return <p>All questions completed!</p>;
		}
	};

	return (
		<div>
			<h1>Interview</h1>
			{renderCurrentQuestion()} {/* Show the current question */}
			<h2>Question number {currentQuestion}</h2>
			{/* Show the Next button only if it's not the last question */}
			{currentQuestion < 5 && (
				<button onClick={nextQuestion}>Next Question</button>
			)}
			{/* Display summary after all questions */}
			{currentQuestion > 5 && (
				<div>
					<h2>Summary of Answers:</h2>
					<p>Answer 1: {interviewAnswer1}</p>
					<p>Answer 2: {interviewAnswer2}</p>
					<p>Answer 3: {interviewAnswer3}</p>
					<p>Answer 4: {interviewAnswer4}</p>
					<p>Answer 5: {interviewAnswer5}</p>
				</div>
			)}
		</div>
	);
}

export default Interview;
