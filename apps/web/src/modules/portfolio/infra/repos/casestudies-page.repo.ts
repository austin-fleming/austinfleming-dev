import { Option } from '$utils/option';
import { cmsClient } from '../cms-client';
import type { CasestudiesPageDTO } from '../dtos/casestudies-page.dto';
import { blockTextProjection, casestudyProjection, isPublishedFilter } from './casestudy-repo';

/* 
TYPES
*/
export type CasestudiesPageRepo = {
	get: () => Promise<Option<CasestudiesPageDTO>>;
};

/* 
QUERIES
*/
const casestudiesPageProjection = `
  ...,
  case_studies[] -> {
    ${casestudyProjection}
  },
  description[] {
    ${blockTextProjection}
  }
`;

/* 
REPO
*/
const get: CasestudiesPageRepo['get'] = async () => {
	const query = `*[_type == "casestudies_page" && ${isPublishedFilter}][0]{${casestudiesPageProjection}}`;

	const homePage = await cmsClient.fetch<CasestudiesPageDTO>(query);

	return Option.of(homePage);
};

export const casestudiesPageRepo: CasestudiesPageRepo = {
	get
};
