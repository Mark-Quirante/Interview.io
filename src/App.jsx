import { useState, useEffect } from "react";
import "./App.css";
import OpenAI from "openai";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Job from "./Job";
import InterviewPrep from "./InterviewPrep";

function App() {
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
		<Router>
			<Navbar />
			<div>
				<Routes>
					<Route path="/" element={<Job />} />
					<Route path="/InterviewPrep" element={<InterviewPrep />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
