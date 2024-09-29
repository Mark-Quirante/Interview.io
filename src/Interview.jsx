import { useContext, useState, useEffect } from "react";
import { OpenAIContext } from "./OpenAIContext";
import { JobContext } from "./JobContext";
import { Link } from "react-router-dom";
import Card from "./components/Card";
import Button from "./components/Button";
import AnswerBox from "./components/AnswerBox";

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

	const [questions, setQuestions] = useState([]);
	const [interviewAnswers, setInterviewAnswers] = useState([]);
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
								content: `Ask me one question about "${jobTitle}" with "${companyName}" and "${jobDescription}".`,
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
		console.log('Answer', answer)

		setInterviewAnswers((prevAnswers) => {
			const newAnswers = [...prevAnswers];
			newAnswers[currentQuestionIndex] = answer;
			return newAnswers;
		});
	};

	// Handler for moving to the next question
	const nextQuestion = () => {
		if (currentQuestionIndex < 4) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	return (
		<div className="flex flex-col flex-1 items-center">
			{questions[currentQuestionIndex] && (
				<div className="flex flex-col items-center flex-1" key={currentQuestionIndex}>
					<div className="text-white text-center mb-5">
						<h1>
							Question {currentQuestionIndex + 1}
						</h1>
						<p>out of 5</p>
					</div>
					<Card className="flex flex-col items-center flex-1">
						<p className="text-center font-bold text-xl">{questions[currentQuestionIndex]}</p>
						<AnswerBox setAnswer={handleAnswer} answer={interviewAnswers[currentQuestionIndex]}/>
						{currentQuestionIndex < 4 && questions.length > currentQuestionIndex && (
							<Button className="w-full" onClick={nextQuestion}>Next Question</Button>
						)}
					</Card>
				</div>
			)}
			
			{/* {currentQuestionIndex === 4 && (
				<div>
					<h2>Summary of Answers:</h2>
					{interviewAnswers.map((answer, index) => (
						<p key={index}>
							Answer {index + 1}: {answer}
						</p>
					))}
				</div>
			)} */}
			<ButtonLink to="/Results">End Interview</ButtonLink>
		</div>
	);
}

export default Interview;
