import { aspectRatio } from '$utils/aspect-ratio';
import type { ImageAssetDTO } from '../dtos/image-asset.dto';
import type { SeoImage } from '../models/fragments/seo-image';
import type { ImageAsset } from '../models/image-asset';

const dtoToModel = (dto: ImageAssetDTO): ImageAsset => {
	const { alt, attribution, caption, asset } = dto.image;

	console.log({ dto });

	return {
		_type: 'image_asset',
		alt,
		aspectRatio: aspectRatio(asset.metadata.dimensions.width, asset.metadata.dimensions.height),
		attribution: attribution,
		base64Lqip: asset.metadata.lqip,
		caption,
		height: asset.metadata.dimensions.height,
		id: asset._id,
		provider: `SANITY`,
		url: asset.url,
		width: asset.metadata.dimensions.width
	};
};

// TODO: needs to actually resize the image
const dtoToSeoImage = (dto: ImageAssetDTO): SeoImage => ({
	height: dto.image.asset.metadata.dimensions.height,
	url: dto.image.asset.url,
	width: dto.image.asset.metadata.dimensions.width
});

const imageAssetMapper = {
	dtoToModel,
	dtoToSeoImage
};

export { imageAssetMapper };
