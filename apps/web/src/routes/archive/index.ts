import type { SnippetsPage } from '$modules/portfolio/infra/models/snippets-page';
import { pageService } from '$modules/portfolio/infra/services/page.service';
import type { RequestHandler } from '@sveltejs/kit';

type Parameters = { slug: string };
type Output = { body: { snippetsPage: SnippetsPage }; status: 200 } | { status: 404 };

const makeSuccessResponse = (snippetsPage: SnippetsPage) => ({
	body: {
		snippetsPage
	},
	status: 200
});

const makeFailureResponse = () => ({
	status: 404
});

export const get: RequestHandler<Parameters, Output> = async () => {
	const maybeSnippetsPage = await pageService.getSnippetsPage();
	const maybe

	return maybeSnippetsPage.match(makeSuccessResponse, makeFailureResponse);
};
