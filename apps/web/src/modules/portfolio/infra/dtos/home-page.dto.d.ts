import type { Combine } from '$utils/combine';
import type { CasestudyDTO } from './casestudy.dto';
import type { DocumentBaseDTO } from './fragments/document-base.dto';

export type HomePageDTO = Combine<
	DocumentBaseDTO,
	{
		_type: 'home_page';
		case_studies: CasestudyDTO[];
		title: string;
	}
>;
