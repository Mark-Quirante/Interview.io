import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Job from "./Job";
import Starter from "./Starter";
import { JobProvider } from "./JobContext";
import { OpenAIProvider } from "./OpenAIContext";

function App() {
	return (
		<OpenAIProvider>
			<JobProvider>
				<Router>
					<Navbar />
					<div>
						<Routes>
							<Route path="/" element={<Job />} />
							<Route path="/Starter" element={<Starter />} />
						</Routes>
					</div>
				</Router>
			</JobProvider>
		</OpenAIProvider>
	);
}

export default App;
