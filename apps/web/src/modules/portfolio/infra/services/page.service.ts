import type { Option } from '$utils/option';
import type { CasestudiesPage } from '../models/casestudies-page';
import type { HomePage } from '../models/home-page';
import type { SnippetsPage } from '../models/snippets-page';
import type { CasestudiesPageRepo } from '../repos/casestudies-page.repo';
import { casestudiesPageMapper } from '../mappers/casestudies-page.mapper';
import { homePageMapper } from '../mappers/home-page.mapper';
import { SnippetPageMapper } from '../mappers/snippet-page.mapper';
import { casestudiesPageRepo } from '../repos/casestudies-page.repo';
import { homePageRepo, type HomePageRepo } from '../repos/home-page-repo';
import { snippetsPageRepo, type SnippetsPageRepo } from '../repos/snippets-page-repo';

const getSnippetsPage = (repo: SnippetsPageRepo) => async (): Promise<Option<SnippetsPage>> => {
	const maybeSnippetsPage = await repo.get();

	return maybeSnippetsPage.map(SnippetPageMapper.dtoToModel);
};

const getHomePage = (repo: HomePageRepo) => async (): Promise<Option<HomePage>> => {
	const maybeHomePage = await repo.get();

	const maybeHomePageAsModel = maybeHomePage.map(homePageMapper.dtoToModel);

	// TODO: this should be decomposed. It adds the next case study in the series for each case study.
	return maybeHomePageAsModel.map((homepage) => ({
		...homepage,
		casestudies: homepage.casestudies.map((casestudy, index) => {
			if (index === homepage.casestudies.length - 1) {
				return {
					next: homepage.casestudies[0],
					...casestudy
				};
			}

			return {
				next: homepage.casestudies[index + 1],
				...casestudy
			};
		})
	}));
};

const getCasestudiesPage =
	(repo: CasestudiesPageRepo) => async (): Promise<Option<CasestudiesPage>> => {
		const maybeCasestudiesPage = await repo.get();

		const maybeCasestudiesPageModel = maybeCasestudiesPage.map(casestudiesPageMapper.dtoToModel);

		// TODO: this should be decomposed. It adds the next case study in the series for each case study.
		return maybeCasestudiesPageModel.map((page) => ({
			...page,
			casestudies: page.casestudies.map((casestudy, index) => {
				if (index === page.casestudies.length - 1) {
					return {
						next: page.casestudies[0],
						...casestudy
					};
				}

				return {
					next: page.casestudies[index + 1],
					...casestudy
				};
			})
		}));
	};

export const pageService = {
	getCasestudiesPage: getCasestudiesPage(casestudiesPageRepo),
	getHomePage: getHomePage(homePageRepo),
	getSnippetsPage: getSnippetsPage(snippetsPageRepo)
};
