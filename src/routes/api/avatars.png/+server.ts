import { avatarImageUrl } from '$lib/firstmap';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const original = await fetch(avatarImageUrl);
	let response = new Response(original.body, original);
	response.headers.set('Cache-Control', 'public, max-age=31536000');
	// github pages already sets an etag, so we don't need to
	return response;
};

export const prerender = true;
