import type { Combine } from '$utils/combine';
import type { DocumentBase } from './fragments/document-base.dto';

export type TagDTO = Combine<
	DocumentBase,
	{
		slug: {
			_type: 'slug';
			current: string;
		};
		title: string;
	}
>;
