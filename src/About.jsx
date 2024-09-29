import imageAJ from "./assets/AJ.jpg";
import imageAngel from "./assets/Angel.jpg";
import imageMonica from "./assets/Monica.jpg";
import imageMark from "./assets/Mark.jpg";

function About() {
	return (
		<div>
			<ul className="flex justify-between flex-row text-center gap-x-8">
				<li>
					<img
						className="object-cover h-75 w-96 rounded-full"
						src={imageAJ}
					></img>
					<p className="text-2xl text-white">Augustus Jay Del Rosario</p>
				</li>
				<li>
					<img
						className="object-cover h-75 w-96 rounded-full"
						src={imageAngel}
					></img>
					<p className="text-2xl text-white">Angelica Mapeso</p>
				</li>
				<li>
					<img
						className="object-cover h-44 w-96 rounded-full"
						src={imageMonica}
					></img>
					<p className="text-2xl text-white">Monica Mobashera</p>
				</li>
				<li>
					<img
						className="object-cover h-75 w-96 rounded-full"
						src={imageMark}
					></img>
					<p className="text-2xl text-white">Mark Quirante</p>
				</li>
			</ul>
		</div>
	);
}

export default About;
