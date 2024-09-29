import { useContext } from "react";
import { InterviewAnswersContext } from "./InterviewAnswersContext";
import { JobContext } from "./JobContext";
import InterviewEnd from "./assets/interview_end.svg";
import SummaryCard from "./components/SummaryCard";

function Results() {
	const { interviewData } = useContext(InterviewAnswersContext);
	const { jobTitle, companyName } = useContext(JobContext);

	return (
		<div>
			<div className="flex flex-col lg:flex-row items-center lg:items-end mb-8 lg:mb-16">
				<h1 className="text-white text-center lg:text-start mb-5 lg:flex-[3_3_0%] lg:text-[2rem]">Congratulations on completing your mock interview for the<br />
					<span className="text-light-green text-[1.5em] lg:text-[1.1em]">{jobTitle} Position</span><br /><span className="font-normal">at 
					<span className="text-light-green"> {companyName}</span></span>
				</h1>
				<img className="mb-3 relative lg:top-[100px] lg:scale-150 w-full max-w-[75%] lg:max-w-[500px] lg:flex-1" src={InterviewEnd} alt="Celebrating" />
			</div>
			<p className="text-center lg:text-start text-white mb-8">Here&apos;s my feedback on your answers.</p>
			<div className="flex flex-col lg:flex-row lg:w-full lg:overflow-x-auto">
				{interviewData.slice(0, 5).map((item, index) => (
					<SummaryCard className="lg:min-w-[300px] z-[1]" key={index} questionNumber={index + 1} question={item.question} answer={item.answer} />
				))}
			</div>
		</div>
	);
}

export default Results;
