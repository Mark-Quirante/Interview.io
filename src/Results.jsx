import { useContext, useState } from "react";
import { InterviewAnswersContext } from "./InterviewAnswersContext";
import { OpenAIContext } from "./OpenAIContext";

function Results() {
	const { interviewData } = useContext(InterviewAnswersContext);
	const openai = useContext(OpenAIContext);
	const [analysisResult, setAnalysisResult] = useState(""); // State for storing the combined analysis
	const [isLoading, setIsLoading] = useState(false); // Loading state for the analysis

	// Function to analyze all answers using OpenAI API
	const analyzeAnswers = async () => {
		setIsLoading(true);
		try {
			// Prepare the combined prompt with all questions and answers
			const userPrompt = interviewData
				.map((item, index) => `Q: ${item.question}\nA: ${item.answer}`)
				.join("\n\n");

			// Send the combined data to OpenAI for a single analysis
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

			// Store the single analysis result
			setAnalysisResult(response.choices[0].message.content);
		} catch (error) {
			console.error("Error fetching from OpenAI API:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h2>Summary of Results:</h2>
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

			<button onClick={analyzeAnswers} disabled={isLoading}>
				{isLoading ? "Analyzing..." : "Analyze All Answers"}
			</button>

			{analysisResult && (
				<div>
					<h3>Overall Analysis:</h3>
					<p>{analysisResult}</p>
				</div>
			)}
		</div>
	);
}

export default Results;
