import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

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
