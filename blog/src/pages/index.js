import styles from "../app/page.module.css";
import { useState, useEffect } from 'react';
import { GraphQLClient, gql } from "graphql-request";
import "../app/globals.css";
import BlogCard from "../components/BlogCard.js";
import Head from "next/head";

const graphCMS = new GraphQLClient(
	"https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clsuoxac30mle07waqofhmifn/master",
	{
		headers: {
			authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDkwNDgyMzAsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xzdW94YWMzMG1sZTA3d2Fxb2ZobWlmbi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiZjM5NTk5YzgtYWNlYi00OThmLTgxYjYtNjI0OGZjNWVkYmNhIiwianRpIjoiY2x0NGo2dWhnMDIzaDA3dW0yYWNzYjd2ZiJ9.aVcmDZRFwTbplA3oXrgYcvVpoHvr4bEuXCR6925myP0rSpwzCjQntOXo8_vXqd-_Yzo_EsBUV4ycaxC6_G1-gU941VnCBX6duv-DB-bpKoMM0EfWnrefUz1IH9mK92sLSFu20J3_0FUSSVbAiEIgYOFBqqEac_yLs5MYwBHOVgBEbaA4dFdxja9EdmCnWCxg9BvFASp6HKgSXVL_m6YYJeL8Z8ZXhS-CfBQVg18NecQ6HYHRCRqBnYvVXgO5lnG4t0btwY33fI8TFbI1m7Si9M4IUvDP_iBnQPtUv45W1Imv_WAWUI7LPKBIU_ZJdRbPk6sH10wJzCvbjagBcmnQ11F-yikPGm4iMqBbpFZ3WSmZ6hPSdFbgYhdi8E5OQ7ahXWWEPcCO9-ENAX3IL2NXFLBTFgnHaHkMooPmuRsGRktPssR7OHPVhJD8YoDHeEDSsR8f4d6yzITA7wWt6LeQ2OU3jmaTDP8FWpCogRZs__0O5JKgPOTooKc8JBgTGBuu7kw3RTkH7Y4fMm8JREE7aWQfGLMmyh5llCYlJpydfXtz8NOq6Do-Zwzq5kQok20eJFzD95ODeee8wFOhJatSgzviWwfYWYOzE5hrFnsVgtgHgWOVfbLEgtXhIdXXrMLjnlZg-Z_rDcTw1tPfgVJcRdSQrjIz6h6oakS4TSkgCBU`,
		},
	}
);

const QUERY = gql`
	query {
		posts {
			title
			id
			slug
			datePublished
			tag
			content {
				html
			}
		}
	}
`;
export async function getStaticProps() {
	try {
		const { posts } = await graphCMS.request(QUERY);
		return {
			props: {
				posts,
			},
			revalidate: 10,
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				posts: [],
			},
		};
	}
}

export default function Home({ posts }) {
	const [isLoading, setIsLoading] = useState(!posts);

	useEffect(() => {
		if (posts) {
			setIsLoading(false);
		}
	}, [posts]);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	console.log(posts);
	const [selectedTags, setSelectedTags] = useState([]);

	const toggleTag = (tagItem) => {
		setSelectedTags(prevTags =>
			prevTags.includes(tagItem) ? prevTags.filter(tag => tag !== tagItem) : [...prevTags, tagItem]
		);
	};

	const filteredPosts = selectedTags.length > 0
		? posts.filter(post => selectedTags.every(tag => post.tag.includes(tag)))
		: posts;

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main className={styles.main}>
				<section className={styles.mainContent}>
					{" "}
					<h1>Pushing Pixels</h1>
					<p>
						Welcome to Pushing Pixels, the personal blog of{" "}
						<a href="https://andershofsten.com" target="_blank">
							Anders Hofsten
						</a>
					</p>
					<p>
						This is where I will post random bits and bobs I find/create as I am trying to shift my career
						towards being a frontend developer. Click the card to expand the post, or click the tags to filter posts :)
					</p>
				</section>

				<div className={styles.divider}></div>
				<section className={styles.posts}>
					<div className={styles.container}>
						{filteredPosts.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished)).map((post) => (
							<BlogCard
								key={post.id}
								title={post.title}
								datePublished={post.datePublished}
								slug={post.slug}
								tag={post.tag}
								content={post.content.html}
								onTagClick={toggleTag}
								selectedTags={selectedTags}
								setSelectedTags={setSelectedTags}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
