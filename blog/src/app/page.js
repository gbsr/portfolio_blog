import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
	return (
		<main className={styles.main}>
			<section className="main-content">	<h1>Pushing Pixels</h1>
				<p>
					Welcome to Pushing Pixels, the personal blog of <a href="https://andershofsten.com" target="_blank">Anders Hofsten</a></p>
				<p>This is where I will post random bits and bobs I find/create as I am trying to shift my career towards being a frontend developer.</p>

			</section>


		</main >
	);
}
