import { siteMetadataConfig } from '$config/site-metadata.config';
import type { TagDTO } from '../dtos/tag.dto';
import type { Tag } from '../models/tag';

const dtoToModel = (dto: TagDTO): Tag => ({
	id: dto._id,
	path: `/tags/${dto.slug.current}`,

	seo: {
		canonical: `${siteMetadataConfig.url}/tags/${dto.slug.current}`,
		pageTitle: `${dto.title} | ${siteMetadataConfig.title}`
	},
	// TODO: centralize routing
	slug: dto.slug.current,
	timestampModified: dto._updatedAt || dto._createdAt,
	timestampPublished: dto._createdAt,
	title: dto.title
});

const dtosToStringArray = (tags: TagDTO[]): string[] => tags.map(({ title }) => title);

export const tagMappers = {
	dtoToModel,
	dtosToStringArray
};
