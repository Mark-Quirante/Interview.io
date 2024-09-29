import { createContext, useState } from "react";

export const JobContext = createContext();
export const JobProvider = ({ children }) => {
	const [jobTitle, setJobTitle] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [result, setResult] = useState([]);

	const addResult = (questions, answers, feedback) => {
		setResult((prevResult) => [
			...prevResult,
			{ questions, answers, feedback },
		]);
	};

	return (
		<JobContext.Provider
			value={{
				jobTitle,
				setJobTitle,
				companyName,
				setCompanyName,
				jobDescription,
				setJobDescription,
				result,
				setResult,
				addResult,
			}}
		>
			{children}
		</JobContext.Provider>
	);
};
