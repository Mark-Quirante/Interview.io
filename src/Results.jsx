import { useContext } from "react";
import { InterviewAnswersContext } from "./InterviewAnswersContext";

function Results() {
	const { interviewData } = useContext(InterviewAnswersContext);

	return (
		<div>
			<h2>Summary of results:</h2>
			{interviewData.slice(0, 5).map((item, index) => (
				<div key={index} style={{ marginBottom: "20px" }}>
					<p>
						<strong>Question {index + 1}:</strong> {item.question}
					</p>
					<p>
						<strong>Answer {index + 1}:</strong> {item.answer}
					</p>
				</div>
			))}
		</div>
	);
}

export default Results;
