import type { HomePage } from '$modules/portfolio/infra/models/home-page';
import { pageService } from '$modules/portfolio/infra/services/page.service';
import type { RequestHandler } from '@sveltejs/kit';

type Parameters = { slug: string };
type Output = { body: { homePage: HomePage }; status: 200 } | { status: 404 };

// TODO: make responses DRY
const makeSuccessResponse = (homePage: HomePage) => ({
	body: {
		homePage
	},
	status: 200
});

const makeFailureResponse = () => ({
	status: 404
});

export const get: RequestHandler<Parameters, Output> = async () => {
	const maybeHomePage = await pageService.getHomePage();

	return maybeHomePage.match(makeSuccessResponse, makeFailureResponse);
};
