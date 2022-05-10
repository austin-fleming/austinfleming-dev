import type { ImageAsset } from '../image-asset';
import type { VideoAsset } from '../video-asset';
import type { ArticleTextSection } from './article-text-section';

export type ArticleBody = Array<{ _key: string } & (VideoAsset | ImageAsset | ArticleTextSection)>;
