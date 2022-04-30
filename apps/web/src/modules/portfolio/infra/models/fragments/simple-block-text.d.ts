import type { SimplePortableTextBlockDTO } from '../../dtos/fragments/simple-block-text-dto';

type SimplePortableTextBlock = Expand<
	Omit<SimplePortableTextBlockDTO, 'markDefs'> & {
		markDefs?: Link[];
	}
>;

export type SimpleBlockText = SimplePortableTextBlock[];
