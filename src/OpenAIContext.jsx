import { createContext } from "react";
import { OpenAI } from "openai";

const OpenAIContext = createContext(null);

export const OpenAIProvider = ({ children }) => {
	const openai = new OpenAI({
		organization: "org-W7tvaOCfRNIIKnZuD6tsObLp",
		project: "proj_YxiK587sqM1kOM61QK0X46uO",
		apiKey: import.meta.env.VITE_API_KEY,
		dangerouslyAllowBrowser: true,
	});

	return (
		<OpenAIContext.Provider value={openai}>{children}</OpenAIContext.Provider>
	);
};

export { OpenAIContext };
