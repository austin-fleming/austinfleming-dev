import type { InternalReferenceLinkDTO, LinkDTO } from '../../dtos/fragments/link-dto';
import type { Link } from '../../models/fragments/link';

// TODO: This should somehow be tied to a site config to ensure the routes correlate.
// Route name is also manually set in each page's mapper function. There should be one source of truth
const routeBuilders: Record<
	InternalReferenceLinkDTO['internalReference']['_type'],
	(slug: any) => string
> = {
	author: (slug: string) => `/authors/${slug}`,
	case_study: (slug: string) => `/case-studies/${slug}`,
	casestudies_page: () => `/case-studies`,
	home_page: () => `/`,
	snippets_page: () => `/snippets`,
	tag: (slug: string) => `/tags/${slug}`
};

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
			// @ts-expect-error: Some reference types don't have a slug. If not, the param won't be used.
			to: routeBuilders[dto.internalReference._type](dto.internalReference.slug?.current)
		};

	// @ts-expect-error: Ideally this would be 'never', but this provides feedback during builds and a fallback.
	throw new Error(`Link has an invalid "linkType" property of "${dto.linkType}"`);
};

export const linkMapper = { dtoToModel };
