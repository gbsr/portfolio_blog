import React from 'react';
import styles from './TagCloud.module.css';

const countTagFrequency = (posts) => {
	const tagFrequency = {};

	posts.forEach((post) => {
		if (post.tag) {
			post.tag.forEach((tag) => {
				if (tagFrequency[tag]) {
					tagFrequency[tag]++;
				} else {
					tagFrequency[tag] = 1;
				}
			});
		}
	});

	return tagFrequency;
};




const TagCloud = ({ posts, selectedTags = [], onTagClick }) => {
	const tagFrequency = countTagFrequency(posts);

	return (
		<div className={styles.tagCloudWrapper}>
			<div className={styles.tag}>


				{Object.keys(tagFrequency).map((tagItem) => (
					<span
						key={tagItem}
						className={`${styles.tag} ${selectedTags.includes(tagItem) ? styles.active : ''}`}
						onClick={() => onTagClick(tagItem)}
						// fancy logaritmic curve to set font size based on tag frequency. Adjust the exponent to scale the font size 
						style={{ fontSize: `${tagFrequency[tagItem] === 0 ? 0 : 1 + Math.log(tagFrequency[tagItem])}em` }}
					>
						{tagItem}
					</span>
				))}
			</div>
		</div>
	);
};

export default TagCloud;