import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Job from "./Job";
import Starter from "./Starter";
import { JobProvider } from "./JobContext";
import { OpenAIProvider } from "./OpenAIContext";
import MicRecorderProvider from "./provider/MicRecorderProvider";
import Interview from "./Interview";
import Footer from "./Footer";
import Results from "./Results";

function App() {
	return (
		<OpenAIProvider>
			<JobProvider>
				<MicRecorderProvider>
					<Router>
						<Navbar />
						<div className="p-5 md:p-10 lg:p-8 max-w-[900px] flex flex-col flex-1">
							<Routes>
								<Route path="/" element={<Job />} />
								<Route path="/Starter" element={<Starter />} />
								<Route path="/Interview" element={<Interview />} />
								<Route path="/Results" element={<Results />} />
							</Routes>
						</div>
						<Footer />
					</Router>
				</MicRecorderProvider>
			</JobProvider>
		</OpenAIProvider>
	);
}

export default App;
