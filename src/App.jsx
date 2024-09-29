import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Job from "./Job";
import Starter from "./Starter";
import { JobProvider } from "./JobContext";
import { OpenAIProvider } from "./OpenAIContext";
import MicRecorderProvider from "./provider/MicRecorderProvider";

function App() {
	return (
		<OpenAIProvider>
			<JobProvider>
				<MicRecorderProvider>
				<Router>
					<Navbar />
					<div>
						<Routes>
							<Route path="/" element={<Job />} />
							<Route path="/Starter" element={<Starter />} />
						</Routes>
					</div>
				</Router>
				</MicRecorderProvider>
			</JobProvider>
		</OpenAIProvider>
	);
}

export default App;
