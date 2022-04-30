export const serializeJsonLd = (body: Record<string, any>) =>
	`<script type="application/ld+json">${JSON.stringify(body)}</script>`;
