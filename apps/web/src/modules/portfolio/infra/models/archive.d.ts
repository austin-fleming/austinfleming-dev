import type { ImageAsset } from './image-asset';
import type { VideoAsset } from './video-asset';

type ArticleSEO = {
	type: 'article';
};

type PageSEO = {
	type: 'webpage';
};

type DocumentBase = {
	id: string;
	path: string;
	seo: Record<string, any>;
	slug: string;
	timestampModified?: string;
	timestampPublished: string;
	title: string;
};

export type ArchiveItem = {
	media: Array<ImageAsset | VideoAsset>;
};

/* 
- homePage
  - pageSEO
  - casestudy[]
  - socialLink[]

- archivePage
  - pageSEO
  - casestudy[]
  - snippet[]
*/

/* 
- caseStudy
  - articleSEO

- snippet
  - articleSEO
  - title
  - summary
  - tags
  - media[]
*/

/* 
- home
- recent
- archive
- contact
*/
