// InterviewAnswersContext.js
import { createContext, useState } from "react";

export const InterviewAnswersContext = createContext();

export const InterviewAnswersProvider = ({ children }) => {
	const [interviewData, setInterviewData] = useState([]);

	return (
		<InterviewAnswersContext.Provider
			value={{
				interviewData,
				setInterviewData,
			}}
		>
			{children}
		</InterviewAnswersContext.Provider>
	);
};
