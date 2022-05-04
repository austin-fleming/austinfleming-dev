import type { Casestudy } from '$modules/portfolio/infra/models/casestudy';
import { pageService } from '$modules/portfolio/infra/services/page.service';
import { Option } from '$utils/option';
import type { RequestHandler } from '@sveltejs/kit';

type Parameters = { slug: string };
type Output = { body: { casestudy: Casestudy }; status: 200 } | { status: 404 };

const makeSuccessResponse = (casestudy: Casestudy) => ({
	body: {
		casestudy
	},
	status: 200
});

const makeFailureResponse = () => ({
	status: 404
});

export const get: RequestHandler<Parameters, Output> = async ({ params }) => {
	// const maybeCasestudy = await casestudyUsecases.getBySlug(params.slug);
	// TODO: casestudyUsecases.getBySlug doesn't populate the 'next' field currently.
	const maybeHomePage = await pageService.getHomePage();

	const maybeCasestudy = maybeHomePage.flatMap((homepage) =>
		Option.of(homepage.casestudies.find((casestudy) => casestudy.slug === params.slug))
	);

	return maybeCasestudy.match(makeSuccessResponse, makeFailureResponse);
};
