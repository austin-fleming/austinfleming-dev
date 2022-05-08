import type { RequestHandler } from '@sveltejs/kit';
import { pageService } from '$modules/portfolio/infra/services/page.service';
import type { CasestudiesPage } from '$modules/portfolio/infra/models/casestudies-page';

type Parameters = { slug: string };
type Output = { body: { casestudies: CasestudiesPage }; status: 200 } | { status: 404 };

const makeSuccessResponse = (casestudiesPage: CasestudiesPage) => ({
	body: {
		casestudiesPage
	},
	status: 200
});

const makeFailureResponse = () => ({
	status: 404
});

// TODO: needs project list from home page
export const get: RequestHandler<Parameters, Output> = async () => {
	const maybeCasestudiesPage = await pageService.getCasestudiesPage();

	return maybeCasestudiesPage.match(makeSuccessResponse, makeFailureResponse);
};
