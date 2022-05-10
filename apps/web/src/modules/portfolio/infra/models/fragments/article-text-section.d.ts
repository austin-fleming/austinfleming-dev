import type { ArticleBlockText } from './article-block-text';

export type ArticleTextSection = {
	_key: string;
	_type: 'article_text_section';
	body: ArticleBlockText;
	title: string;
};
