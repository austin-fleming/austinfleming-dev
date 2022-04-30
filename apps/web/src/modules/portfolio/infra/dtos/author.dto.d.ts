import type { Combine } from '$utils/combine';
import type { DocumentBaseDTO } from './fragments/document-base.dto';
import type { ImageAssetDTO } from './image-asset.dto';

export type AuthorDTO = Combine<
	DocumentBaseDTO,
	{
		_type: 'author';
		blurb: string;
		do_not_crawl: boolean;
		name: string;
		occupation: string;
		primary_website: string;
		profile_image: ImageAssetDTO;
		slug: {
			_type: 'slug';
			current: string;
		};
		social_profiles: string[];
	}
>;
