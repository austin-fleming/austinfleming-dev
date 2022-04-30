<script lang="ts">
	// https://medium.com/front-end-weekly/html-picture-tag-in-practice-png-and-webp-formats-5a3fc51b5998
</script>

<picture>
	<source type="image/webp" media="(min-width: 1921px)" srcset="src/images/very-large/bike.webp" />
	<source type="image/jpeg" media="(min-width: 1921px)" srcset="src/images/very-large/bike.jpeg" />
	<img src="src/images/bike-2003909.jpeg" style="width: 100%;" />
</picture>
