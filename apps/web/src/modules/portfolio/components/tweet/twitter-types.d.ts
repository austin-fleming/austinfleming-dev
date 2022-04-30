type TweetLang =
	| 'ar'
	| 'bn'
	| 'cs'
	| 'da'
	| 'de'
	| 'el'
	| 'en'
	| 'es'
	| 'fa'
	| 'fi'
	| 'fil'
	| 'fr'
	| 'he'
	| 'hi'
	| 'hu'
	| 'id'
	| 'it'
	| 'ja'
	| 'ko'
	| 'msa'
	| 'nl'
	| 'no'
	| 'pl'
	| 'pt'
	| 'ro'
	| 'ru'
	| 'sv'
	| 'th'
	| 'tr'
	| 'uk'
	| 'ur'
	| 'vi'
	| 'zh-cn'
	| 'zh-tw';

type CreateTweetOptions = {
	align?: 'left' | 'center' | 'right';
	cards?: 'hidden';
	conversation?: 'none';
	dnt?: boolean;
	id?: string;
	lang?: TweetLang;
	theme?: 'light' | 'dark';
	// Max Width, must be between 250px and 550px
	width?: number;
};

type CreateTweetFunction = (
	tweetID: string,
	targetElement: HTMLElement,
	options: CreateTweetOptions
) => HTMLElement | undefined;

// NOTE: this is not a thorough typing; instead, it provides types for what this component needs.
export type TwttrObject = {
	ready: () => Promise<TwttrObject>;
	widgets: {
		createTweet: CreateTweetFunction;
	};
};
