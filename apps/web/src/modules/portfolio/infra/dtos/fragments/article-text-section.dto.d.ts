import type { ArticleBlockTextDTO } from './article-block-text-dto';

export type ArticleTextSectionDTO = {
	_key: string;
	_type: 'article_text_section';
	body: ArticleBlockTextDTO;
	title: string;
};
