/**
 * BlogPost component that renders a blog post.
 *
 * Props:
 * - title: Post title
 * - slug: Post slug
 * - id: Post id
 * - tag: Array of post tags
 * - datePublished: Publish date
 * - content: Post content as HTML
 * - selectedTags: Array of currently selected tags
 * - setSelectedTags: Setter for selectedTags
 *
 * Renders the post title, tags, content.
 * Content can be expanded/collapsed.
 * Applies syntax highlighting to code blocks.
 * Handles tag selection.
 */
import { useState, useEffect, useRef } from "react";
import styles from "../app/page.module.css";
import Prism from "../prismJS/prism.css";
import "../prismJS/prism.js";

export default function BlogPost({ title, slug, id, tag, datePublished, content, selectedTags, setSelectedTags }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const contentRef = useRef(null);
	useEffect(() => {
		if (contentRef.current) {
			// Get all code elements within this BlogPost
			const codeSnippets = contentRef.current.querySelectorAll("code");

			// Loop over each code element
			codeSnippets.forEach((code) => {
				console.log("snippy snips nipy");
				// Determine the language of the code snippet
				// This is a basic example, you might need to adjust this code to fit your needs
				let language;
				if (code.textContent.includes("<")) {
					language = "html";
				} else if (code.textContent.includes("{")) {
					language = "css";
				} else if (code.textContent.includes("React")) {
					language = "jsx";
				} else {
					language = "javascript";
				}

				// Add the language class to the code element
				code.classList.add(`language-${language}`);
			});

			// Apply syntax highlighting
			window.Prism.highlightAll();
		}
	}, [content]);
	const handleContentClick = () => {
		setIsExpanded(!isExpanded);
		console.log("click");
	};

	const onTagClick = (tagItem, event) => {
		event.stopPropagation(); // prevent the click event from bubbling up

		// Toggle the tag in the selectedTags state
		if (selectedTags.includes(tagItem)) {
			setSelectedTags(selectedTags.filter((tag) => tag !== tagItem));
		} else {
			setSelectedTags([...selectedTags, tagItem]);
		}
	};

	return (
		<div
			className={`${isExpanded ? "expand" : "truncate"}`}
			onClick={handleContentClick}
			style={{ marginBottom: "60px" }}>
			<h2 className={styles.title}>{title}</h2>
			{tag.map((tagItem, index) => (
				<span
					key={index}
					className={`${styles.tag} ${selectedTags.includes(tagItem) ? styles.active : ""}`}
					onClick={(event) => onTagClick(tagItem, event)} // pass the event to onTagClick
				>
					{tagItem}
				</span>
			))}
			<div
				ref={contentRef}
				className={isExpanded ? "expanded" : "truncated"}
				dangerouslySetInnerHTML={{ __html: content }}
			></div>
		</div>
	);
}
