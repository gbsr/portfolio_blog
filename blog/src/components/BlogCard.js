import { useState } from 'react';
import styles from '../app/page.module.css';

export default function BlogPost({
	title,
	slug,
	id,
	tag,
	datePublished,
	content,
	selectedTags,
	setSelectedTags
}) {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleContentClick = () => {
		setIsExpanded(!isExpanded);
		console.log('click');
	};

	const onTagClick = (tagItem, event) => {
		event.stopPropagation(); // prevent the click event from bubbling up

		// Toggle the tag in the selectedTags state
		if (selectedTags.includes(tagItem)) {
			setSelectedTags(selectedTags.filter(tag => tag !== tagItem));
		} else {
			setSelectedTags([...selectedTags, tagItem]);
		}
	};

	return (
		<div className={`${isExpanded ? 'expand' : 'truncate'}`} onClick={handleContentClick}>
			<h2 className={styles.title}>{title}</h2>
			{tag.map((tagItem, index) => (
				<span
					key={index}
					className={`${styles.tag} ${selectedTags.includes(tagItem) ? styles.active : ''}`}
					onClick={(event) => onTagClick(tagItem, event)} // pass the event to onTagClick
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