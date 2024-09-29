import { useContext, useEffect, useState } from "react";
import { OpenAIContext } from "./OpenAIContext";
import { JobContext } from "./JobContext";
import { Link } from "react-router-dom";
import Card from "./components/Card";
import InterviewStart from "./assets/interview_start.svg";
import Button from "./components/Button";

function ButtonLink({ to, children }) {
	return (
		<Link className="mt-8 font-bold inline-block w-full max-w-[400px]" to={to}>
			<Button className="w-full">{children}</Button>
		</Link>
	);
}

function Starter() {
	const openai = useContext(OpenAIContext); // Access OpenAI context
	const { jobTitle, companyName } = useContext(JobContext); // Access jobTitle from JobContext
	const [responseText, setResponseText] = useState(""); // State to hold the API response

	// useEffect to handle the API call when the component mounts or when jobTitle changes
	useEffect(() => {
		const fetchOpenAIResponse = async () => {
			if (companyName) {
				// Ensure jobTitle is available
				try {
					const response = await openai.chat.completions.create({
						model: "gpt-4o", // Specify the model
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
						max_tokens: 250, // Adjust token limit as necessary
						temperature: 0.7,
					});

					// Set the API response text to state
					setResponseText(response.choices[0].message.content);
				} catch (error) {
					console.error("Error fetching from OpenAI API:", error);
				}
			}
		};

		fetchOpenAIResponse();
	}, [companyName, openai]); // Dependency array includes companyName and openai

	return (
		<div className="container">
			<div className="flex flex-col lg:flex-row items-center lg:items-end mb-8 lg:mb-16">
				<h1 className="text-white text-center lg:text-start mb-5 lg:flex-[3_3_0%] lg:text-[2rem]">Welcome to your mock interview for the<br />
					<span className="text-light-green text-[1.5em] lg:text-[1.1em]">{jobTitle} Position</span><br /><span className="font-normal">at 
					<span className="text-light-green"> {companyName}</span></span>
				</h1>
				<img className="relative lg:top-[50px] lg:scale-150 w-full max-w-[75%] lg:max-w-[500px] lg:flex-1" src={InterviewStart} alt="Job interview underway" />
			</div>
			<Card className="flex flex-col items-center relative mt-[-30px] z-[100] mb-5">
				<p className="text-center mb-5 text-xl font-bold">
					Let me tell you a little bit about the company.
				</p>
				<p className="text-green mb-5">{responseText ? responseText : "Loading company details..."}</p>
			{responseText && <ButtonLink to="/Interview">Start answering<br/>Interview Questions</ButtonLink>}
			</Card>
		</div>
	);
}

export default Starter;
