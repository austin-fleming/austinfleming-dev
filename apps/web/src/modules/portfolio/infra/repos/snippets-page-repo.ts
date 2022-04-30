import { Option } from '$utils/option';
import { cmsClient } from '../cms-client';
import type { SnippetsPageDTO } from '../dtos/snippets-page.dto';
import { imageAssetProjection, videoAssetProjection, isPublishedFilter } from './casestudy-repo';

/* 
TYPES
*/
export type SnippetsPageRepo = {
	get: () => Promise<Option<SnippetsPageDTO>>;
};

/* 
QUERIES
*/
const fullHomePageProjection = `
  ...,
  snippets[] -> {
    ...,
    _type == "image_asset" => {
      ${imageAssetProjection}
    },
    _type == "video_asset" => {
      ${videoAssetProjection}
    }
  }
`;

/* 
REPO
*/
const get: SnippetsPageRepo['get'] = async () => {
	const query = `*[_type == "snippets_page" && ${isPublishedFilter}][0]{${fullHomePageProjection}}`;

	const homePage = await cmsClient.fetch<SnippetsPageDTO>(query);

	return Option.of(homePage);
};

export const snippetsPageRepo: SnippetsPageRepo = {
	get
};
