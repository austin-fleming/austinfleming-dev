import type { CasestudiesPageDTO } from '../dtos/casestudies-page.dto';
import type { CasestudiesPage } from '../models/casestudies-page';
import { casestudyMapper } from './casestudy.mapper';
import { simpleBlockTextMapper } from './fragments/simple-block-text.mapper';

const dtoToModel = (dto: CasestudiesPageDTO): CasestudiesPage => {
	const { _type, _id, _createdAt, _updatedAt, case_studies, title, subtitle, description } = dto;

	return {
		_type,
		breadcrumbs: [
			{
				label: 'home',
				to: '/'
			}
		],
		casestudies: case_studies.map(casestudyMapper.dtoToModel),
		id: _id,
		path: '/',
		subtitle,
		timestampModified: _updatedAt || _createdAt,
		timestampPublished: _createdAt,
		title,
		...(description ? { description: simpleBlockTextMapper.dtoToModel(description) } : {})
	};
};

export const casestudiesPageMapper = { dtoToModel };
