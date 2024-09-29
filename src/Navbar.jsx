import video from "./assets/Interview.io.png";
import { Link } from "react-router-dom";

function ButtonLink({ to, children }) {
	return (
		<Link to={to}>
			<button>{children}</button>
		</Link>
	);
}

function Navbar() {
	return (
		<nav className="bg-green-500 p-5 flex justify-between items-center">
			<img
				src={video}
				alt="Interview.io Logo"
				style={{ width: "200px", height: "200px", borderRadius: "50%" }}
			></img>
			<ul>
				<li>Land that job!</li>
				<li>
					<ButtonLink to="/About">About</ButtonLink>
				</li>
			</ul>
		</nav>
	);
}
export default Navbar;
