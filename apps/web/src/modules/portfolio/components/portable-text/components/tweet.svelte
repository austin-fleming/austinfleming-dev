<script lang="ts">
	import type { Tweet as TweetModel } from '$modules/portfolio/infra/models/fragments/tweet';
	import Tweet from '../../tweet/tweet.svelte';

	const tweetProperties: TweetModel = $$props.portableText.block;
</script>

<Tweet tweetId={tweetProperties.tweetId} placeholderHeight={tweetProperties.placeholderHeight} />
