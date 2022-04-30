import { map } from '$utils/map';
import type { Option } from '$utils/option';
import { casestudyMapper } from '../mappers/casestudy.mapper';
import type { Casestudy } from '../models/casestudy';
import { casestudyRepo, type CasestudyRepo } from '../repos/casestudy-repo';

type GetBySlug = (slug: string) => Promise<Option<Casestudy>>;
type GetPaginated = (limit?: number, offset?: number) => Promise<Option<Casestudy[]>>;

const makeCasestudyUsecases = (repo: CasestudyRepo) => {
	const getBySlug: GetBySlug = async (slug: string) => {
		const maybeCasestudy = await repo.getBySlug(slug);

		return maybeCasestudy.map(casestudyMapper.dtoToModel);
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
