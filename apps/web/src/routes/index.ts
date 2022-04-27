import { casestudyUsecases } from '$modules/shared/infra/usecases/casestudy-usecases';
import type { CaseStudy } from '$modules/shared/models/case-study';
import type { RequestHandler } from '@sveltejs/kit';

type Parameters = { slug: string };
type Output = { body: { casestudies: CaseStudy[] }; status: 200 } | { status: 404 };

const makeSuccessResponse = (casestudies: CaseStudy[]) => ({
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
