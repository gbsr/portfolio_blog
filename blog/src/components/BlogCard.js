import { useState } from 'react';
import styles from '../app/page.module.css';

export default function BlogPost({
	title,
	slug,
	id,
	tag,
	datePublished,
	content,
	onTagClick,
	selectedTags
}) {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleContentClick = () => {
		setIsExpanded(!isExpanded);
		console.log('click');
	};

	return (
		<div className={`${isExpanded ? 'expand' : 'truncate'}`} onClick={handleContentClick}>
			<h2 className={styles.title}>{title}</h2>
			<span className={styles.span}>{`Date Published: ${datePublished}`}</span>
			{tag.map((tagItem, index) => (
				<span
					key={index}
					className={`${styles.tag} ${selectedTags.includes(tagItem) ? styles.active : ''}`}
					onClick={() => onTagClick(tagItem)}
				>
					{tagItem}
				</span>
			))}
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{ __html: content }}
				style={{ opacity: isExpanded ? 1 : 0.45, padding: '1rem' }}
			></div>
		</div>
	);
}