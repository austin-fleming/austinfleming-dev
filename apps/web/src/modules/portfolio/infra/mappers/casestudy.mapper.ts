/* 
VALUE OBJECTS
*/

import { siteMetadataConfig } from '$config/site-metadata.config';
import type { CasestudyDTO } from '../dtos/casestudy.dto';
import type { Casestudy } from '../models/casestudy';
import type { ArticleSEO } from '../models/fragments/article-seo';
import { authorMapper } from './author.mapper';
import { articleBlockTextMapper } from './fragments/article-block-text.mapper';
import { simpleBlockTextMapper } from './fragments/simple-block-text.mapper';
import { imageAssetMapper } from './image-asset.mapper';
import { tagMappers } from './tag.mapper';
import { videoAssetMapper } from './video-asset.mapper';

/* 
MAPPER
*/
const dtoToModel = (dto: CasestudyDTO): Casestudy => {
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
		summary,
		short_summary
	} = dto;

	// TODO: where should this be determined?
	const path = `/case-studies/${slug.current}`;

	const canonicalUrl = `${siteMetadataConfig.url}${path}`;

	const makeProjectDetails = (): Casestudy['projectDetails'] => {
		if (!project_details || project_details.length === 0) return;

		return project_details.map(({ title, description }) => ({
			description: simpleBlockTextMapper.dtoToModel(description),
			title
		}));
	};

	const tagList = tagMappers.dtosToStringArray(tags);
	const keywords = [...tagList, ...(seo_keywords || [])];

	// TODO: use tags instead of keywords
	const seo: ArticleSEO = {
		canonicalUrl: canonicalUrl,
		description: seo_summary || simpleBlockTextMapper.dtoToPlainText(summary),
		doNotCrawl: do_not_crawl,
		image: imageAssetMapper.dtoToSeoImage(primary_image),
		keywords,
		ogType: 'article',
		pageTitle: `${title} | ${siteMetadataConfig.title}`,
		schemaType: 'Article',
		title
	};

	const breadcrumbs = [
		{
			label: 'home',
			to: '/'
		},
		{
			label: 'work',
			to: '/case-studies'
		}
	];

	const casestudy: Casestudy = {
		authors: [authorMapper.dtoToModel(author)],
		body: articleBlockTextMapper.dtoToModel(body),
		breadcrumbs,
		featuredImage: imageAssetMapper.dtoToModel(primary_image),
		featuredVideo: primary_video ? videoAssetMapper.dtoToModel(primary_video) : undefined,
		id: _id,
		isFeatured: false,
		isRestricted: false,
		path,
		projectDetails: makeProjectDetails(),
		seo,
		shortSummary: short_summary,
		slug: slug.current,
		summary: simpleBlockTextMapper.dtoToModel(summary),
		tags: tags.map(tagMappers.dtoToModel),
		timestampModified: date_revised,
		timestampPublished: date_published,
		title
	};

	return casestudy;
};

const casestudyMapper = {
	dtoToModel
};

export { casestudyMapper };
