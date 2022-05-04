import type { ArticleBlockTextDTO } from '../../dtos/fragments/article-block-text-dto';
import type { ArticleBlockText } from '../../models/fragments/article-block-text';
import { imageAssetMapper } from '../image-asset.mapper';
import { videoAssetMapper } from '../video-asset.mapper';
import { linkMapper } from './link.mapper';

const dtoToModel = (blocks: ArticleBlockTextDTO): ArticleBlockText =>
	blocks.map((block) => {
		if (block._type === 'video_asset') return videoAssetMapper.dtoToModel(block);
		if (block._type === 'image_asset') return imageAssetMapper.dtoToModel(block);

		// Assumes _type === 'block' from here down
		const markDefs = block.markDefs
			? block.markDefs.map((mark) => linkMapper.dtoToModel(mark))
			: undefined;

		return { ...block, markDefs };
	});

const dtoToPlainText = (blocks: ArticleBlockTextDTO): string =>
	blocks
		.map((block) => {
			if (block._type !== 'block' || !block.children) {
				return '';
			}
			return block.children.map((child) => child.text).join('');
		})
		.join('\n\n');

export const articleBlockTextMapper = {
	dtoToModel,
	dtoToPlainText
};
