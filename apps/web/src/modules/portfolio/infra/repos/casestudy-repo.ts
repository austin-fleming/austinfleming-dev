import { cmsClient } from '../cms-client';
import type { Nothing } from '$utils/nothing';
import type { Option } from '$utils/option';
import { option } from '$utils/option';
import type { CasestudyDTO } from '../dtos/casestudy.dto';

/* 
TYPES
*/
export type CasestudyRepo = {
	getBySlug: (slug: string) => Promise<Option<CasestudyDTO>>;
	getPaginated: (limit: number, offset: number) => Promise<Option<CasestudyDTO[]>>;
};

/* 
QUERIES
*/
export const isPublishedFilter = `!(_id in path("drafts.**"))`;

export const videoAssetProjection = `
	...,
	asset_data {
		...,
		asset->
	}
`;

export const imageAssetProjection = `
	...,
	image { 
		..., 
		asset->
	}
`;

export const blockTextProjection = `
	...,
	_type == "block" => {
		markDefs[] {
			...,
			_type == "link" => {
				...,
				internalReference->
			}
		}
	},
	_type == "video" => @-> {
		${videoAssetProjection}
	},
	_type == "image" => @-> {
		${imageAssetProjection}
	}
`;

export const casestudyProjection = `
	...,
	author-> {
		...,
		profile_image-> {
			...,
			image { 
				..., 
				asset->
			}
		}
	},
	body[] {${blockTextProjection}},
	primary_image-> {
		${imageAssetProjection}
	},
	primary_video-> {
		${videoAssetProjection}
	},
	tags[]->,
	article_body[] {
		...,
		_type == "reference" => @-> {
			...,
			image {
				...,
				asset->
			},
			asset_data {
				...,
				asset->
			}
		},
		_type == "article_text_section" => {
			...,
			body[] {${blockTextProjection}}
		}
	}
`;

/*
METHODS 
*/
// TODO: should these return an Option, an Either, or a Result?
const getBySlug = async (slug: string) => {
	const casestudy = await cmsClient.fetch<CasestudyDTO>(
		`*[_type == "case_study" && slug.current == $slug && ${isPublishedFilter}][0]{${casestudyProjection}}`,
		{
			slug
		}
	);

	return option(casestudy);
};

const getPaginated = async (limit: number, offset: number) => {
	const startCursor = limit * offset;
	const endCursor = startCursor + limit;

	// TODO: will need to be ordered first
	const casestudies = await cmsClient.fetch<CasestudyDTO[]>(
		`*[_type == "case_study" && ${isPublishedFilter}][$startCursor..$endCursor]{${casestudyProjection}}`,
		{ endCursor, startCursor }
	);

	return option(casestudies);
};

export const casestudyRepo: CasestudyRepo = {
	getBySlug,
	getPaginated
};
