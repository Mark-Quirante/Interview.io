import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import "./styles/Navbar.css";

function ButtonLink({ to, children }) {
	return (
		<Link to={to}>
			<button className="text-light-green">{children}</button>
		</Link>
	);
}

function Navbar() {
	return (
		<nav className="w-full p-5 flex justify-between items-center">
			<Link to="/">
				<img id="logo" src={logo} alt="Interview.io Logo"></img>
			</Link>
			<ul>
				<li>
					<ButtonLink to="/About">About</ButtonLink>
				</li>
			</ul>
		</nav>
	);
}
export default Navbar;
