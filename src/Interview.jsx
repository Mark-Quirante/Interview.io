import { useContext, useState, useEffect } from "react";
import { OpenAIContext } from "./OpenAIContext";
import { JobContext } from "./JobContext";
import SpeechToText from "../src/components/SpeechToText";
import { Link } from "react-router-dom";
import { MicRecorderContext } from "./provider/MicRecorderProvider";
import { InterviewAnswersContext } from "./InterviewAnswersContext";

function ButtonLink({ to, children }) {
	return (
		<Link to={to}>
			<button>{children}</button>
		</Link>
	);
}

function Interview() {
	const openai = useContext(OpenAIContext);
	const { jobTitle, companyName, jobDescription } = useContext(JobContext);
	const { clearObjects } = useContext(MicRecorderContext);

	const { interviewData, setInterviewData } = useContext(
		InterviewAnswersContext
	);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	// Fetch a question from OpenAI based on the job title
	useEffect(() => {
		const fetchOpenAIQuestion = async () => {
			if (jobTitle) {
				try {
					const response = await openai.chat.completions.create({
						model: "gpt-4",
						messages: [
							{
								role: "system",
								content: "You are an interviewer.",
							},
							{
								role: "user",
								content: `Ask me one question about "${jobTitle}" with "${companyName}" and "${jobDescription}". A question an interviewer may ask to see if the applicant fits the role`,
							},
						],
						max_tokens: 150,
						temperature: 0.7,
					});

					const newQuestion = response.choices[0].message.content;

					// Add the new question to the interview data
					setInterviewData((prevData) => [
						...prevData,
						{ question: newQuestion, answer: "" },
					]);
				} catch (error) {
					console.error("Error fetching from OpenAI API:", error);
				}
			}
		};

		if (currentQuestionIndex < 5) {
			fetchOpenAIQuestion();
		}
	}, [
		jobTitle,
		companyName,
		jobDescription,
		openai.chat.completions,
		currentQuestionIndex,
		setInterviewData,
	]);

	const handleAnswer = (answer) => {
		setInterviewData((prevData) => {
			const updatedData = [...prevData];
			updatedData[currentQuestionIndex] = {
				...updatedData[currentQuestionIndex],
				answer,
			};
			return updatedData;
		});
	};

	const nextQuestion = () => {
		clearObjects();
		if (currentQuestionIndex < 4) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	return (
		<div>
			<h1>Interview</h1>
			{interviewData[currentQuestionIndex] && (
				<div key={currentQuestionIndex} style={{ marginBottom: "20px" }}>
					<h2>
						Question {currentQuestionIndex + 1}:{" "}
						{interviewData[currentQuestionIndex].question}
					</h2>
					{interviewData[currentQuestionIndex].answer ? (
						<p>Your Answer: {interviewData[currentQuestionIndex].answer}</p>
					) : (
						<SpeechToText
							setAnswer={handleAnswer}
							questionNumber={currentQuestionIndex + 1}
						/>
					)}
				</div>
			)}
			{currentQuestionIndex < 4 &&
				interviewData.length > currentQuestionIndex && (
					<button onClick={nextQuestion}>Next Question</button>
				)}
			{currentQuestionIndex === 4 && (
				<div>
					<h2>Summary of Answers:</h2>
					{interviewData.map((item, index) => (
						<div key={index}>
							<p>
								Question {index + 1}: {item.question}
							</p>
							<p>
								Answer {index + 1}: {item.answer}
							</p>
						</div>
					))}
				</div>
			)}
			<ButtonLink to="/Results">Results</ButtonLink>
		</div>
	);
}

export default Interview;
