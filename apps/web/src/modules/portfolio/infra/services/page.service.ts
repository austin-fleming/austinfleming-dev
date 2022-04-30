import type { Option } from '$utils/option';
import { homePageMapper } from '../mappers/home-page.mapper';
import { SnippetPageMapper } from '../mappers/snippet-page.mapper';
import type { HomePage } from '../models/home-page';
import type { SnippetsPage } from '../models/snippets-page';
import { homePageRepo, type HomePageRepo } from '../repos/home-page-repo';
import { snippetsPageRepo, type SnippetsPageRepo } from '../repos/snippets-page-repo';

const getSnippetsPage = (repo: SnippetsPageRepo) => async (): Promise<Option<SnippetsPage>> => {
	const maybeSnippetsPage = await repo.get();

	return maybeSnippetsPage.map(SnippetPageMapper.dtoToModel);
};

const getHomePage = (repo: HomePageRepo) => async (): Promise<Option<HomePage>> => {
	const maybeHomePage = await repo.get();

	return maybeHomePage.map(homePageMapper.dtoToModel);
};

export const pageService = {
	getHomePage: getHomePage(homePageRepo),
	getSnippetsPage: getSnippetsPage(snippetsPageRepo)
};
