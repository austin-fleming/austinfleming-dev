import type { Combine } from 'src/utils/combine';
import type { AuthorDTO } from './author.dto';
import type { ArticleBlockTextDTO } from './fragments/article-block-text-dto';
import type { ArticleBodyDTO } from './fragments/article-body.dto';
import type { DocumentBaseDTO } from './fragments/document-base.dto';
import type { SimpleBlockTextDTO } from './fragments/simple-block-text-dto';
import type { ImageAssetDTO } from './image-asset.dto';
import type { TagDTO } from './tag.dto';
import type { VideoAssetDTO } from './video-asset.dto';

type ProjectDetailDTO = {
	_key: string;
	_type: 'detail';
	description: SimpleBlockTextDTO;
	title: string;
};

export type CasestudyDTO = Combine<
	DocumentBaseDTO,
	{
		_type: 'case_study';
		article_body: ArticleBodyDTO;
		author: AuthorDTO;
		body: ArticleBlockTextDTO;
		date_published: string;
		date_revised?: string;
		do_not_crawl: boolean;
		primary_image: ImageAssetDTO;
		primary_video?: VideoAssetDTO;
		project_details?: ProjectDetailDTO[];
		seo_keywords?: string[];
		seo_summary?: string;
		short_summary: string;
		slug: {
			_type: 'slug';
			current: string;
		};
		summary: SimpleBlockTextDTO;
		tags: TagDTO[];
		title: string;
	}
>;
