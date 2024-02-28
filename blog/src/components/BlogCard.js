import { useState } from 'react';
import styles from '../app/page.module.css';

export default function BlogPost({
	title,
	slug,
	id,
	tag,
	datePublished,
	content,
	onTagClick }) {

	const [selectedTags, setSelectedTags] = useState([]);

	const toggleTag = (tagItem) => {
		if (selectedTags.includes(tagItem)) {
			setSelectedTags(selectedTags.filter((tag) => tag !== tagItem));
		} else {
			setSelectedTags([...selectedTags, tagItem]);
		}
		onTagClick(tagItem);
	};

	return (
		<div className={styles.card}>
			<h2 className={styles.title}>{title}</h2>
			<span className={styles.span}>{`Date Published: ${datePublished}`}</span>
			{tag.map((tagItem, index) => (
				<span
					key={index}
					className={`${styles.tag} ${selectedTags.includes(tagItem) ? styles.active : ''}`}
					onClick={() => toggleTag(tagItem)}
				>
					{tagItem}
				</span>
			))}
			<div dangerouslySetInnerHTML={{ __html: content }} className={styles.content}></div>
		</div>
	);
}