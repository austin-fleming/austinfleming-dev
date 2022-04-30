import type { SimpleBlockTextDTO } from '../../dtos/fragments/simple-block-text-dto';
import type { SimpleBlockText } from '../../models/fragments/simple-block-text';
import { linkMapper } from './link.mapper';

const dtoToModel = (blocks: SimpleBlockTextDTO): SimpleBlockText =>
	blocks.map((block) => {
		// Assumes _type === 'block' from here down
		const markDefs = block.markDefs
			? block.markDefs.map((mark) => linkMapper.dtoToModel(mark))
			: undefined;

		return { ...block, markDefs };
	});

const dtoToPlainText = (blocks: SimpleBlockTextDTO): string =>
	blocks
		.map((block) => {
			if (block._type !== 'block' || !block.children) {
				return '';
			}
			return block.children.map((child) => child.text).join('');
		})
		.join('\n\n');

export const simpleBlockTextMapper = {
	dtoToModel,
	dtoToPlainText
};
