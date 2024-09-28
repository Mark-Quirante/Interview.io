import video from "./assets/InterviewLogo_optimized.gif";

function Navbar() {
	return (
		<nav className="bg-green-500 p-10">
			<img
				src={video}
				alt="Interview.io Logo"
				style={{ width: "100px", height: "100px", borderRadius: "50%" }}
			></img>
			<p>Land that job!</p>
			<p>About Us</p>
		</nav>
	);
}
export default Navbar;
