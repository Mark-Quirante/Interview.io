import { createContext, useState } from "react";

export const JobContext = createContext();
export const JobProvider = ({ children }) => {
	const [jobTitle, setJobTitle] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [jobDescription, setJobDescription] = useState("");

	return (
		<JobContext.Provider
			value={{
				jobTitle,
				setJobTitle,
				companyName,
				setCompanyName,
				jobDescription,
				setJobDescription,
			}}
		>
			{" "}
			{children}
		</JobContext.Provider>
	);
};
