import React from 'react';
import styles from './TagCloud.module.css'; // import your styles

const countTagFrequency = (posts) => {
	const tagFrequency = {};

	posts.forEach((post) => {
		post.tags.forEach((tag) => {
			if (tagFrequency[tag]) {
				tagFrequency[tag]++;
			} else {
				tagFrequency[tag] = 1;
			}
		});
	});

	return tagFrequency;
};
import React from 'react';
import styles from './TagCloud.module.css'; // import your styles

const TagCloud = ({ posts, selectedTags, onTagClick }) => {
	const tagFrequency = countTagFrequency(posts);

	return (
		<div className={styles.tagCloud}>
			{Object.keys(tagFrequency).map((tagItem) => (
				<span
					key={tagItem}
					className={`${styles.tag} ${selectedTags.includes(tagItem) ? styles.active : ''}`}
					onClick={() => onTagClick(tagItem)}
					style={{ fontSize: `${tagFrequency[tagItem]}em` }} // adjust this to scale the font size as you want
				>
					{tagItem}
				</span>
			))}
		</div>
	);
};

export default TagCloud;
export default TagCloud;