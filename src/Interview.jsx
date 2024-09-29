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

	console.log(jobTitle);

	const [questions, setQuestions] = useState([]);
	const { interviewAnswers, setInterviewAnswers } = useContext(
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
					setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
				} catch (error) {
					console.error("Error fetching from OpenAI API:", error);
				}
			}
		};

		if (currentQuestionIndex < 4) {
			fetchOpenAIQuestion();
		}
	}, [
		jobTitle,
		companyName,
		jobDescription,
		openai.chat.completions,
		currentQuestionIndex,
	]);

	// Handler for storing the answer
	const handleAnswer = (answer) => {
		setInterviewAnswers((prevAnswers) => {
			const newAnswers = [...prevAnswers];
			newAnswers[currentQuestionIndex] = answer;
			return newAnswers;
		});
	};

	// Handler for moving to the next question
	const nextQuestion = () => {
		clearObjects();
		if (currentQuestionIndex < 4) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	return (
		<div>
			<h1>Interview</h1>
			{questions[currentQuestionIndex] && (
				<div key={currentQuestionIndex} style={{ marginBottom: "20px" }}>
					<h2>
						Question {currentQuestionIndex + 1}:{" "}
						{questions[currentQuestionIndex]}
					</h2>
					{interviewAnswers[currentQuestionIndex] ? (
						<p>Your Answer: {interviewAnswers[currentQuestionIndex]}</p>
					) : (
						<SpeechToText
							setAnswer={handleAnswer}
							questionNumber={currentQuestionIndex + 1}
						/>
					)}
				</div>
			)}
			{currentQuestionIndex < 4 && questions.length > currentQuestionIndex && (
				<button onClick={nextQuestion}>Next Question</button>
			)}
			{currentQuestionIndex === 4 && (
				<div>
					<h2>Summary of Answers:</h2>
					{interviewAnswers.map((answer, index) => (
						<p key={index}>
							Answer {index + 1}: {answer}
						</p>
					))}
				</div>
			)}
			<ButtonLink to="/Results">Results</ButtonLink>
		</div>
	);
}

export default Interview;
