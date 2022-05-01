import { siteMetadataConfig } from '$config/site-metadata.config';
import type { PersonSEO } from '../models/fragments/person-seo';
import type { AuthorDTO } from '../dtos/author.dto';
import type { Author } from '../models/author';
import { imageAssetMapper } from './image-asset.mapper';

const mapPersonSeo = (data: AuthorDTO): PersonSEO => ({
	canonicalUrl: `${siteMetadataConfig.url}/authors/${data.slug.current}`,
	description: data.blurb,
	doNotCrawl: data.do_not_crawl,
	image: imageAssetMapper.dtoToSeoImage(data.profile_image),
	keywords: [data.occupation], // TODO: needs actual keywords
	ogType: 'profile',
	schemaType: 'Person',
	title: data.name
});

const dtoToModel = (dto: AuthorDTO): Author => ({
	blurb: dto.blurb,
	id: dto._id,
	name: dto.name,
	occupation: dto.occupation,
	path: `/authors/${dto.slug.current}`,
	primaryWebsiteUrl: dto.primary_website,
	profileImage: imageAssetMapper.dtoToModel(dto.profile_image),
	seo: mapPersonSeo(dto),
	slug: dto.slug.current,
	socialProfileUrls: dto.social_profiles,
	timestampModified: dto._updatedAt || dto._createdAt,
	timestampPublished: dto._createdAt
});

export const authorMapper = {
	dtoToModel,
	mapPersonSeo
};
