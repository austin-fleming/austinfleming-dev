import type { Casestudy } from '$modules/portfolio/infra/models/casestudy';
import { casestudyUsecases } from '$modules/portfolio/infra/services/casestudy.service';
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
	const maybeCasestudy = await casestudyUsecases.getBySlug(params.slug);

	return maybeCasestudy.match(makeSuccessResponse, makeFailureResponse);
};
