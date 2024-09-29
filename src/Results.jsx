import { useContext, useState } from "react";
import { InterviewAnswersContext } from "./InterviewAnswersContext";
import { OpenAIContext } from "./OpenAIContext";
import { JobContext } from "./JobContext";
import InterviewEnd from "./assets/interview_end.svg";
import SummaryCard from "./components/SummaryCard";
import Button from "./components/Button";

function Results() {
	const { interviewData } = useContext(InterviewAnswersContext);
	const { jobTitle, companyName } = useContext(JobContext);
	const openai = useContext(OpenAIContext);
	const [analysisResult, setAnalysisResult] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const analyzeAnswers = async () => {
		setIsLoading(true);
		try {
			const userPrompt = interviewData
				.map((item) => `Q: ${item.question}\nA: ${item.answer}`)
				.join("\n\n");

			const response = await openai.chat.completions.create({
				model: "gpt-4",
				messages: [
					{
						role: "system",
						content:
							"You are an interview coach that will analyze how well the interview answers match expected responses.",
					},
					{
						role: "user",
						content: `Evaluate the following interview questions and answers as a whole, and provide feedback on the quality of the responses:\n\n${userPrompt}`,
					},
				],
				max_tokens: 500,
				temperature: 0.7,
			});

			setAnalysisResult(response.choices[0].message.content);
		} catch (error) {
			console.error("Error fetching from OpenAI API:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className="flex flex-col lg:flex-row items-center lg:items-end mb-8 lg:mb-16">
				<h1 className="text-white text-center lg:text-start mb-5 lg:flex-[3_3_0%] lg:text-[2rem]">Congratulations on completing your mock interview for the<br />
					<span className="text-light-green text-[1.5em] lg:text-[1.1em]">{jobTitle} Position</span><br /><span className="font-normal">at 
					<span className="text-light-green"> {companyName}</span></span>
				</h1>
				<img className="mb-3 relative lg:top-[100px] lg:scale-150 w-full max-w-[75%] lg:max-w-[500px] lg:flex-1" src={InterviewEnd} alt="Celebrating" />
			</div>
			<p className="text-center lg:text-start text-white mb-8">Here&apos;s a summary of all your answers.</p>
			<div className="flex flex-col lg:flex-row lg:w-full lg:overflow-x-auto">
				{interviewData.slice(0, 5).map((item, index) => (
					<SummaryCard className="lg:min-w-[300px] z-[1]" key={index} questionNumber={index + 1} question={item.question} answer={item.answer} />
				))}
			</div>

			<div className="flex flex-col items-center lg:items-start">
				{!analysisResult &&
					<Button className="mt-8" onClick={analyzeAnswers} isDisabled={isLoading}>
						{isLoading ? "Analyzing..." : "Generate Analysis"}
					</Button>
				}

				{analysisResult && (
					<div className="text-white mt-8">
						<p className="font-bold text-xl mb-2">Here&apos;s an analysis on your answers from the mock interview.</p>
						<p className="text-light-green">{analysisResult}</p>
						<p className="font-bold mt-8 text-center">Thank you and good luck on your interview with {companyName}!</p>
					</div>

				)}
			</div>
		</div>
	);
}

export default Results;
