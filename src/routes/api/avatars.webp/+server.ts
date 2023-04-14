import { avatarImageUrl } from '$lib/firstmap';
import sharp from 'sharp';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const original = await fetch(avatarImageUrl);

	const img = await sharp(await original.arrayBuffer())
		.toFormat('webp')
		.toBuffer();

	let response = new Response(img);
	response.headers.set('Content-Type', 'image/webp');
	response.headers.set('Content-Length', img.byteLength.toString());

	response.headers.set('Cache-Control', 'public, max-age=31536000');
	response.headers.set('Etag', original.headers.get('Etag')!);
	response.headers.set('Last-Modified', original.headers.get('Last-Modified')!);

	return response;
};

export const prerender = true;
