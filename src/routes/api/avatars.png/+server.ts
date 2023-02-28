import { avatarImageUrl } from '$lib/firstmap';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const original = await fetch(avatarImageUrl);
	return new Response(await original.arrayBuffer(), original);
};

export const prerender = true;
