import { useContext } from "react";
import { JobContext } from "./JobContext";
import { Link } from "react-router-dom";
import SpeechToText from "./components/SpeechToText";

function ButtonLink({ to, children }) {
	return (
		<Link to={to}>
			<button>{children}</button>
		</Link>
	);
}

function Job() {
	const {
		jobTitle,
		setJobTitle,
		companyName,
		setCompanyName,
		jobDescription,
		setJobDescription,
	} = useContext(JobContext);

	return (
		<div>
			<SpeechToText/>
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
							<input
								className="bg-green-500"
								value={jobTitle}
								onChange={(e) => setJobTitle(e.target.value)}
							></input>
						</td>
					</tr>
					<tr>
						<td>Company Name:</td>
						<td>
							<input
								className="bg-green-500"
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
							></input>
						</td>
					</tr>
					<tr>
						<td>Job Description:</td>
						<td>
							<input
								className="bg-green-500"
								value={jobDescription}
								onChange={(e) => setJobDescription(e.target.value)}
							></input>
						</td>
					</tr>
				</table>
			</div>
			<ButtonLink to="/Starter">Enter</ButtonLink>
		</div>
	);
}

export default Job;
