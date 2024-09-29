import { useContext } from "react";
import { JobContext } from "./JobContext";
import { Link } from "react-router-dom";
import InterviewPrep from "./assets/interview_prep.svg"
import Card from "./components/Card";
import Button from "./components/Button";

function ButtonLink({ to, children }) {
	return (
		<Link className="flex justify-end" to={to}>
			<Button>{children}</Button>
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
		<div className="flex flex-col lg:flex-row">
			<div className="flex flex-col items-center lg:items-start lg:flex-[3_3_0%] lg:mr-5 text-white">
				<h1>Interview.io</h1>
				<p className="text-center mb-5 lg:text-start">
					Practice your responses, receive instant feedback, and refine your answers with a personalized mock interview.
				</p>
				<img className="lg:w-full lg:relative lg:left-[50px]" src={InterviewPrep} alt="Group prepping for interview"/>
			</div>
			<Card className="mt-[-20px] lg:mt-0 lg:flex-[2_2_0%] lg:z-[1]">
				<div className="text-center mb-5">
					<p className="font-bold">Let&apos;s begin your mock interview.</p>
					<p>To start, tell me about the job.</p>
				</div>
				<form className="flex flex-col">
					<label htmlFor="job-title">Job Title</label>
					<input
						id="job-title"
						className="bg-green-500"
						value={jobTitle}
						onChange={(e) => setJobTitle(e.target.value)}
					></input>
					<label htmlFor="company-name">Company Name</label>
					<input
						id="company-name"
						className="bg-green-500"
						value={companyName}
						onChange={(e) => setCompanyName(e.target.value)}
					></input>
					<label htmlFor="job-description">Job Description</label>
					<textarea
						rows="10"
						className="bg-green-500"
						value={jobDescription}
						onChange={(e) => setJobDescription(e.target.value)}
					></textarea>
				</form>
				<ButtonLink to="/Starter">Start</ButtonLink>
			</Card>
		</div>
	);
}

export default Job;
