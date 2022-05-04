import type { Combine } from '$utils/combine';
import type { DocumentBaseDTO } from './fragments/document-base.dto';

export type TagDTO = Combine<
	DocumentBaseDTO,
	{
		_type: 'tag';
		slug: {
			_type: 'slug';
			current: string;
		};
		title: string;
	}
>;
