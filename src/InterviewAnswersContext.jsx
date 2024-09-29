import { createContext, useState } from "react";

export const InterviewAnswersContext = createContext();

export const InterviewAnswersProvider = ({ children }) => {
	const [interviewAnswers, setInterviewAnswers] = useState([]);

	return (
		<InterviewAnswersContext.Provider
			value={{ interviewAnswers, setInterviewAnswers }}
		>
			{children}
		</InterviewAnswersContext.Provider>
	);
};
