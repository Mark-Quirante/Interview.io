import logo from "./assets/logo.png";
import "./styles/NavBar.css";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav className="w-full p-5 flex justify-between items-center">
			<Link to="/"><img
				id="logo"
				src={logo}
				alt="Interview.io Logo"
			></img>
			</Link>
			<ul>
				<li><p className="text-light-green">About</p></li>
			</ul>
		</nav>
	);
}
export default Navbar;
