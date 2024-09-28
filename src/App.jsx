import { useState, useEffect } from "react";
import "./App.css";
import OpenAI from "openai";
function App() {
	const [count, setCount] = useState(0);
	const [haiku, setHaiku] = useState("");

	// Simulating your OpenAI call inside useEffect for when the component mounts
	useEffect(() => {
		const fetchHaiku = async () => {
			try {
				const openai = new OpenAI({
					organization: "org-W7tvaOCfRNIIKnZuD6tsObLp",
					project: "proj_YxiK587sqM1kOM61QK0X46uO",
					apiKey: import.meta.env.VITE_API_KEY,
					dangerouslyAllowBrowser: true,
				});

				const completion = await openai.chat.completions.create({
					model: "gpt-4o",
					messages: [
						{
							role: "system",
							content:
								"You are a helpful assistant that generates interview questions",
						},
						{
							role: "user",
							content: "Do you have any questions for me?",
						},
					],
				});

				setHaiku(console.log(completion.choices[0].message)); // Assuming you get the response content here
			} catch (error) {
				console.error("Error fetching haiku: ", error);
			}
		};

		fetchHaiku(); // Call the async function
	}, []); // Empty array ensures this runs only once when the component mounts

	return (
		<>
			<h1 className="text-3xl font-bold underline">Interview.io</h1>
			<div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta velit
					nobis repellat qui voluptatum error fuga illum non corporis esse
					numquam dolorum ut, sapiente provident cumque veritatis optio quis
					nulla.
				</p>
			</div>
			<div>
				<table>
					<tr>
						<thead>Tell me</thead>
					</tr>
					<tr>
						<td>Job Title:</td>
						<td>
							<input></input>
						</td>
					</tr>
					<tr>
						<td>Company Name:</td>
						<td>
							<input></input>
						</td>
					</tr>
					<tr>
						<td>Job Description:</td>
						<td>
							<input></input>
						</td>
					</tr>
				</table>
			</div>
			<div>
				<button onClick={() => setCount}>Start</button>
			</div>
		</>
	);
}

export default App;
