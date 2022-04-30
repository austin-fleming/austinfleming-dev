import type { Expand } from '$utils/expand';
import type { WithContext, Article, Person } from 'schema-dts';

type PersonJsonLdSchema = Expand<WithContext<Person>>;

type PersonConfig = {
	image: string;
	jobTitle: string;
	name: string;
	primaryWebsiteUrl: string;
	socialProfileUrls: string[];
};

export const buildPersonJsonLd = ({
	socialProfileUrls,
	primaryWebsiteUrl,
	name,
	image,
	jobTitle
}: PersonConfig): PersonJsonLdSchema => ({
	'@context': 'https://schema.org',
	'@type': 'Person',
	image,
	jobTitle,
	name,
	sameAs: socialProfileUrls,
	url: primaryWebsiteUrl
});

type ArticleJsonLdSchema = Expand<WithContext<Article>>;

type ArticleConfig = {
	authors: PersonConfig[];
	canonicalUrl: string;
	description: string;
	headline: string;
	images: string[];
	keywords: string[];
	timestampModified?: string;
	timestampPublished: string;
};

export const buildArticleJsonLd = ({
	headline,
	keywords,
	timestampPublished,
	timestampModified,
	canonicalUrl,
	images,
	description,
	authors
}: ArticleConfig): ArticleJsonLdSchema => ({
	'@context': 'https://schema.org',
	'@type': 'Article',
	author: authors.map(buildPersonJsonLd) as Person[],
	dateModified: timestampModified || timestampPublished,
	datePublished: timestampPublished,
	description,
	headline,
	image: images,
	keywords: keywords.join(', '),
	mainEntityOfPage: {
		'@id': canonicalUrl,
		'@type': 'WebPage'
	}
});
