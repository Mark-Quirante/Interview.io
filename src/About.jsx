import imageAJ from "./assets/AJ.jpg";
import imageAngel from "./assets/Angel.jpg";
import imageMonica from "./assets/Monica.jpg";
import imageMark from "./assets/Mark.jpg";

function About() {
	return (
		<div>
			<ul className="flex flex-row text-center">
				<li>
					<img
						className="object-cover h-96 w-96 rounded-full"
						src={imageAJ}
					></img>
					<p className="text-2xl">Augustus Jay Del Rosario</p>
				</li>
				<li>
					<img
						className="object-cover h-96 w-96 rounded-full"
						src={imageAngel}
					></img>
					<p className="text-2xl">Angelica Mapeso</p>
				</li>
				<li>
					<img
						className="object-cover h-96 w-96 rounded-full"
						src={imageMonica}
					></img>
					<p className="text-2xl">Monica Mobashera</p>
				</li>
				<li>
					<img
						className="object-cover h-96 w-96 rounded-full"
						src={imageMark}
					></img>
					<p className="text-2xl">Mark Quirante</p>
				</li>
			</ul>
		</div>
	);
}

export default About;
