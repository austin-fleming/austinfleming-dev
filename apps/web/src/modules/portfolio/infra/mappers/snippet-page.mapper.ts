import type { SnippetDTO, SnippetsPageDTO } from '../dtos/snippets-page.dto';
import type { Snippet, SnippetsPage } from '../models/snippets-page';
import { imageAssetMapper } from './image-asset.mapper';
import { videoAssetMapper } from './video-asset.mapper';

const mapSnippet = (dto: SnippetDTO): Snippet => {
	if (dto._type === 'image_asset') return imageAssetMapper.dtoToModel(dto);
	if (dto._type === 'video_asset') return videoAssetMapper.dtoToModel(dto);

	// @ts-expect-error: Make sure possible errors are clear
	throw new Error(`Cannot map snippet with type of "${dto._type}".`);
};

const dtoToModel = (dto: SnippetsPageDTO): SnippetsPage => {
	const { _id, _createdAt, _updatedAt, _type, do_not_crawl, snippets } = dto;

	// TODO: needs seo
	return {
		_type,
		id: _id,
		path: `/snippets`,
		snippets: snippets.map(mapSnippet)
	};
};

export const SnippetPageMapper = { dtoToModel };
