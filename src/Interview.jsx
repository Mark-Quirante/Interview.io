import { useContext, useState, useEffect } from "react";
import { OpenAIContext } from "./OpenAIContext";
import { JobContext } from "./JobContext";
import { Link } from "react-router-dom";
import Card from "./components/Card";
import Button from "./components/Button";
import AnswerBox from "./components/AnswerBox";
import { InterviewAnswersContext } from "./InterviewAnswersContext";

function ButtonLink({ to, children }) {
	return (
		<Link className="mt-5" to={to}>
			<button className="font-bold text-lg text-light-green">{children}</button>
		</Link>
	);
}

function Interview() {
	const openai = useContext(OpenAIContext);
	const { jobTitle, companyName, jobDescription } = useContext(JobContext);

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
		if (currentQuestionIndex < 4) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	return (
		<div className="flex flex-col flex-1 items-center">
			{interviewData[currentQuestionIndex] && (
				<div
					className="flex flex-col items-center flex-1"
					key={currentQuestionIndex}
				>
					<div className="text-white text-center mb-5">
						<h1>Question {currentQuestionIndex + 1}</h1>
						<p>out of 5</p>
					</div>
					<Card className="flex flex-col items-center flex-1">
						<p className="text-center font-bold text-xl">
							{interviewData[currentQuestionIndex].question}
						</p>
						<AnswerBox
							setAnswer={handleAnswer}
							answer={interviewData[currentQuestionIndex].answer}
						/>
						{currentQuestionIndex < 4 &&
							interviewData.length > currentQuestionIndex && (
								<Button className="w-full" onClick={nextQuestion}>
									Next Question
								</Button>
							)}
					</Card>
				</div>
			)}
			<ButtonLink to="/Results">End Interview</ButtonLink>
		</div>
	);
}

export default Interview;
