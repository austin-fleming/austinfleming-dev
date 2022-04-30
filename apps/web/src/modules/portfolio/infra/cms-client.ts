import sanityClient from '@sanity/client';

const clientConfig = {
	apiVersion: process.env['SANITY_API_VERSION'],
	dataset: process.env.SANITY_DATASET,
	projectId: process.env.SANITY_PROJECT_ID,
	token: process.env.SANITY_SECRET_VIEWER_TOKEN,
	useCdn: true
};

export const cmsClient = sanityClient(clientConfig);
