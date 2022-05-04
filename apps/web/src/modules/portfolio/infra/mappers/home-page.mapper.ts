import type { HomePageDTO } from '../dtos/home-page.dto';
import type { HomePage } from '../models/home-page';
import { casestudyMapper } from './casestudy.mapper';

const dtoToModel = (dto: HomePageDTO): HomePage => {
	const { _type, _id, _createdAt, _updatedAt, case_studies, title } = dto;

	return {
		_type,
		casestudies: case_studies.map(casestudyMapper.dtoToModel),
		id: _id,
		path: '/',
		timestampModified: _updatedAt || _createdAt,
		timestampPublished: _createdAt,
		title
	};
};

export const homePageMapper = { dtoToModel };
