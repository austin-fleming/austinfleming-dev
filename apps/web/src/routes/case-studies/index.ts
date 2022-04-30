import type { Casestudy } from '$modules/portfolio/infra/models/casestudy';
import { casestudyUsecases } from '$modules/portfolio/infra/services/casestudy.service';
import type { RequestHandler } from '@sveltejs/kit';

type Parameters = { slug: string };
type Output = { body: { casestudies: Casestudy[] }; status: 200 } | { status: 404 };

const makeSuccessResponse = (casestudies: Casestudy[]) => ({
	body: {
		casestudies
	},
	status: 200
});

const makeFailureResponse = () => ({
	status: 404
});

export const get: RequestHandler<Parameters, Output> = async () => {
	const maybeCasestudy = await casestudyUsecases.getPaginated();

	return maybeCasestudy.match(makeSuccessResponse, makeFailureResponse);
};
