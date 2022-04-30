import { Option } from '$utils/option';
import { cmsClient } from '../cms-client';
import type { HomePageDTO } from '../dtos/home-page.dto';
import { casestudyProjection, isPublishedFilter } from './casestudy-repo';

/* 
TYPES
*/
export type HomePageRepo = {
	get: () => Promise<Option<HomePageDTO>>;
};

/* 
QUERIES
*/
const homePageProjection = `
  ...,
  case_studies[] -> {
    ${casestudyProjection}
  }
`;

/* 
REPO
*/
const get: HomePageRepo['get'] = async () => {
	const query = `*[_type == "home_page" && ${isPublishedFilter}][0]{${homePageProjection}}`;

	const homePage = await cmsClient.fetch<HomePageDTO>(query);

	return Option.of(homePage);
};

export const homePageRepo: HomePageRepo = {
	get
};
