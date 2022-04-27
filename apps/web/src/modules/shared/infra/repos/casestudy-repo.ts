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
const fullCasestudyProjection = `
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
	body[] {
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
			...,
			asset_data {
				...,
				asset->
			}
		},
    _type == "image" => @-> {
			...,
			image { 
				..., 
				asset->
			}
		}
  },
	primary_image-> {
		...,
		image { 
			..., 
			asset->
		}
	},
	primary_video-> {
		...,
		asset_data {
			...,
			asset->
		}
	},
	tags[]->
`;

/*
METHODS 
*/
// TODO: should these return an Option, an Either, or a Result?
const getBySlug = async (slug: string) => {
	const casestudy = await cmsClient.fetch<CasestudyDTO>(
		`*[_type == "case_study" && slug.current == $slug][0]{${fullCasestudyProjection}}`,
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
		`*[_type == "case_study"][$startCursor..$endCursor]{${fullCasestudyProjection}}`,
		{ endCursor, startCursor }
	);

	return option(casestudies);
};

export const casestudyRepo: CasestudyRepo = {
	getBySlug,
	getPaginated
};
