import { useContext } from "react";
import { InterviewAnswersContext } from "./InterviewAnswersContext";
import { OpenAIContext } from "./OpenAIContext";
function Results() {
	const { interviewAnswers } = useContext(InterviewAnswersContext);

	return (
		<div>
			<h2>Summary of Answers:</h2>
			{interviewAnswers.map((answer, index) => (
				<p key={index}>
					Answer {index + 1}: {answer}
				</p>
			))}
		</div>
	);
}

export default Results;
