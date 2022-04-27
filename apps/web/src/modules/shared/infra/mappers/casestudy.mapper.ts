/* 
VALUE OBJECTS
*/

import { siteMetadataConfig } from '$config/site-metadata-config';
import type { CasestudyDTO } from '../dtos/casestudy.dto';
import type { ArticleBlockTextDTO } from '../dtos/fragments/article-block-text-dto';
import type { SimpleBlockTextDTO } from '../dtos/fragments/simple-block-text-dto';
import type { Casestudy } from '../models/casestudy';
import type { ArticleBlockText } from '../models/fragments/article-block-text';
import type { ArticleSEO } from '../models/fragments/article-seo';
import { authorMapper } from './author.mapper';
import { linkMapper } from './fragments/link.mapper';
import { imageAssetMapper } from './image-asset.mapper';
import { tagMappers } from './tag.mapper';
import { videoAssetMapper } from './video-asset.mapper';

/* 
Helpers
*/
const mapArticleBlockText = (blocks: ArticleBlockTextDTO): ArticleBlockText =>
	blocks.map((block) => {
		if (block._type === 'video_asset') return videoAssetMapper.dtoToModel(block);
		if (block._type === 'image_asset') return imageAssetMapper.dtoToModel(block);

		console.log('parse marks...');
		// Assumes _type === 'block' from here down
		const markDefs = block.markDefs
			? block.markDefs.map((mark) => linkMapper.dtoToModel(mark))
			: undefined;

		return { ...block, markDefs };
	});

const mapPortableTextToPlainText = (blocks: ArticleBlockTextDTO | SimpleBlockTextDTO) =>
	blocks
		.map((block) => {
			if (block._type !== 'block' || !block.children) {
				return '';
			}
			return block.children.map((child) => child.text).join('');
		})
		.join('\n\n');

/* 
MAPPER
*/
const dtoToModel = (dto: CasestudyDTO): Casestudy => {
	console.log('Calling "casestudyMapper.dtoToModel"');

	const {
		_id,
		date_published,
		date_revised,
		slug,
		title,
		primary_image,
		primary_video,
		project_details,
		do_not_crawl,
		seo_summary,
		seo_keywords,
		body,
		tags,
		author,
		summary
	} = dto;

	// TODO: where should this be determined?
	const path = `/case-studies/${slug.current}`;

	const canonicalUrl = `${siteMetadataConfig.url}${path}`;

	const makeProjectDetails = (): Casestudy['projectDetails'] => {
		if (!project_details || project_details.length === 0) return;

		return project_details.map(({ title, description }) => ({
			description,
			title
		}));
	};

	const tagList = tagMappers.dtosToStringArray(tags);
	const keywords = [...tagList, ...seo_keywords];

	console.log('building casestudy seo');
	console.log('checking...', imageAssetMapper);
	// TODO: use tags instead of keywords
	const seo: ArticleSEO = {
		canonicalUrl: canonicalUrl,
		description: seo_summary || mapPortableTextToPlainText(summary),
		doNotCrawl: do_not_crawl,
		image: imageAssetMapper.dtoToSeoImage(primary_image),
		keywords,
		ogType: 'article',
		pageTitle: `${title} | ${siteMetadataConfig.title}`,
		schemaType: 'Article',
		title
	};

	console.log('building case study');
	const casestudy: Casestudy = {
		authors: [authorMapper.dtoToModel(author)],
		body: mapArticleBlockText(body),
		featuredImage: imageAssetMapper.dtoToModel(primary_image),
		featuredVideo: primary_video ? videoAssetMapper.dtoToModel(primary_video) : undefined,
		id: _id,
		isFeatured: false,
		isRestricted: false,
		path,
		projectDetails: makeProjectDetails(),
		seo,
		slug: slug.current,
		summary,
		tags: tags.map(tagMappers.dtoToModel),
		timestampModified: date_revised,
		timestampPublished: date_published,
		title
	};

	console.log('mapped');

	return casestudy;
};

console.log('casestudy.mapper.ts:', { dtoToModel });

const casestudyMapper = {
	dtoToModel
};

export { casestudyMapper };
