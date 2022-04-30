import type { LinkDTO } from '../../dtos/fragments/link-dto';
import type { Link } from '../../models/fragments/link';

const dtoToModel = (dto: LinkDTO): Link => {
	if (dto.linkType === 'external')
		return { _key: dto._key, _type: 'link', isExternal: true, to: dto.linkExternal.href };

	if (dto.linkType === 'internal')
		return { _key: dto._key, _type: 'link', isExternal: false, to: dto.path };

	if (dto.linkType === 'internalReference')
		return {
			_key: dto._key,
			_type: 'link',
			isExternal: false,
			to: dto.internalReference.slug.current
		};

	// @ts-expect-error: Ideally this would be 'never', but this provides feedback during builds and a fallback.
	throw new Error(`Link has an invalid "linkType" property of "${dto.linkType}"`);
};

export const linkMapper = { dtoToModel };
