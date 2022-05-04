import type { Combine } from '$utils/combine';
import type { CasestudyDTO } from './casestudy.dto';
import type { DocumentBaseDTO } from './fragments/document-base.dto';
import type { SimpleBlockTextDTO } from './fragments/simple-block-text-dto';

export type CasestudiesPageDTO = Combine<
	DocumentBaseDTO,
	{
		_type: 'casestudies_page';
		case_studies: CasestudyDTO[];
		description?: SimpleBlockTextDTO;
		subtitle?: string;
		title: string;
	}
>;
