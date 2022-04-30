import type { Nothing } from '$utils/nothing';
import type { AuthorDTO } from '../author.dto';
import type { CasestudyDTO } from '../casestudy.dto';
import type { TagDTO } from '../tag.dto';

type InternalReferenceLinkDTO = {
	_key: string;
	_type: 'link';
	internalReference: AuthorDTO | CasestudyDTO | TagDTO;
	linkExternal: Nothing;
	linkType: 'internalReference';
	path: Nothing;
};
type ExternalLinkDTO = {
	_key: string;
	_type: 'link';
	internalReference: Nothing;
	linkExternal: {
		href: string;
	};
	linkType: 'external';
	path: Nothing;
};
type InternalLinkDTO = {
	_key: string;
	_type: 'link';
	internalReference: Nothing;
	linkExternal: Nothing;
	linkType: 'internal';
	path: string;
};

export type LinkDTO = InternalReferenceLinkDTO | ExternalLinkDTO | InternalLinkDTO;
