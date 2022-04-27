import type { CasestudyDTO } from '../dtos/casestudy.dto';
import type { Author } from './author';
import type { ArticleBlockText } from './fragments/article-block-text';
import type { ArticleSEO } from './fragments/article-seo';
import type { SimpleBlockText } from './fragments/simple-block-text';
import type { ImageAsset } from './image-asset';
import type { Tag } from './tag';
import type { VideoAsset } from './video-asset';

type ProjectDetail = {
	description: SimpleBlockText;
	title: string;
};

export type Casestudy = {
	authors: Author[];
	body: ArticleBlockText;
	featuredImage: ImageAsset;
	featuredVideo?: VideoAsset;
	id: string;
	isFeatured: boolean;
	isRestricted: boolean;
	path: string;
	projectDetails?: ProjectDetail[];
	seo: ArticleSEO;
	slug: string;
	summary: SimpleBlockText;
	tags: Tag[];
	timestampModified?: string;
	timestampPublished: string;
	title: string;
};
