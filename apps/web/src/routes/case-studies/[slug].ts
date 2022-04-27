import { casestudyUsecases } from '$modules/shared/infra/usecases/casestudy-usecases';
import type { CaseStudy } from '$modules/shared/models/case-study';
import type { RequestHandler } from '@sveltejs/kit';

type Parameters = { slug: string };
type Output = { body: { casestudy: CaseStudy }; status: 200 } | { status: 404 };

const makeSuccessResponse = (casestudy: CaseStudy) => ({
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
