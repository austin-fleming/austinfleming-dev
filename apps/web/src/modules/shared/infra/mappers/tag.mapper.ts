import { siteMetadataConfig } from '$config/site-metadata-config';
import type { TagDTO } from '../dtos/tag.dto';
import type { Tag } from '../models/tag';

const dtoToModel = (tag: TagDTO): Tag => ({
	id: tag._id,
	seo: {
		canonical: `${siteMetadataConfig.url}/tags/${tag.slug.current}`,
		pageTitle: `${tag.title} | ${siteMetadataConfig.title}`
	},
	// TODO: centralize routing
	slug: `/tags/${tag.slug.current}`,
	title: tag.title
});

const dtosToStringArray = (tags: TagDTO[]): string[] => tags.map(({ title }) => title);

export const tagMappers = {
	dtoToModel,
	dtosToStringArray
};
