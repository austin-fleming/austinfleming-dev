import { map } from '$utils/map';
import type { Option } from '$utils/option';
import type { CaseStudy } from '../../models/case-study';
import { casestudyMapper } from '../mappers/casestudy.mapper';
import { casestudyRepo, type CasestudyRepo } from '../repos/casestudy-repo';

type GetBySlug = (slug: string) => Promise<Option<CaseStudy>>;
type GetPaginated = (limit?: number, offset?: number) => Promise<Option<CaseStudy[]>>;

const makeCasestudyUsecases = (repo: CasestudyRepo) => {
	const getBySlug: GetBySlug = async (slug: string) => {
		const maybeCasestudy = await repo.getBySlug(slug);

		return maybeCasestudy.map((x) => casestudyMapper.dtoToModel(x));
	};

	const getPaginated: GetPaginated = async (limit = 10, offset = 0) => {
		const maybeCasestudies = await repo.getPaginated(limit, offset);

		return maybeCasestudies.map(map(casestudyMapper.dtoToModel));
	};

	return {
		getBySlug,
		getPaginated
	};
};

const casestudyUsecases = makeCasestudyUsecases(casestudyRepo);

export { casestudyUsecases };
