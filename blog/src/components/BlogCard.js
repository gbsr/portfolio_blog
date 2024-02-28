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
	return (
		<div className={styles.card}>
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
			<div dangerouslySetInnerHTML={{ __html: content }} className={styles.content}></div>
		</div>
	);
}