import { useContext, useEffect, useState } from "react";
import { OpenAIContext } from "./OpenAIContext";
import { JobContext } from "./JobContext";
import { Link } from "react-router-dom";

function ButtonLink({ to, children }) {
	return (
		<Link to={to}>
			<button>{children}</button>
		</Link>
	);
}

function Starter() {
	const openai = useContext(OpenAIContext);
	const { companyName } = useContext(JobContext);
	const [responseText, setResponseText] = useState("");

	useEffect(() => {
		const fetchOpenAIResponse = async () => {
			if (companyName) {
				try {
					const response = await openai.chat.completions.create({
						model: "gpt-4o",
						messages: [
							{
								role: "system",
								content:
									"You are a helpful assistant for mock interviews. Do not provide formalities",
							},
							{
								role: "user",
								content: `Tell me about the company titled "${companyName}". Provide a general overview 
								of the business.`,
							},
						],
						max_tokens: 250,
						temperature: 0.7,
					});

					setResponseText(response.choices[0].message.content);
				} catch (error) {
					console.error("Error fetching from OpenAI API:", error);
				}
			}
		};

		fetchOpenAIResponse();
	}, [companyName, openai]);

	return (
		<div className="container">
			<h1>Welcome to your Mock Interview!</h1>
			<h2>Let me tell you something about the company titled: {companyName}</h2>
			<p>{responseText ? responseText : "Loading company details..."}</p>
			<p>Ready to start the interview?</p>
			<ButtonLink to="/Interview">YES</ButtonLink>
			<p>Please enable microphone functionality for best results!</p>
		</div>
	);
}

export default Starter;
