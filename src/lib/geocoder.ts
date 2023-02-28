import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
import type { LngLatLike } from 'mapbox-gl';

export const geocodeCache: {
	[key: string]: LngLatLike;
} = {};

export function tbaToAddress(team: TbaTeam) {
	return `${team.school_name ?? ''} ${team.city ?? ''} ${team.state_prov ?? ''} ${team.postal_code ?? ''} ${team.country ?? ''}`;
}

export async function geocode(address: string): Promise<LngLatLike | undefined> {
	if (geocodeCache[address]) return geocodeCache[address];
	console.log('querying geocoder for', address);

	const data = await (await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`)).json();
	const coords = data.features?.[0]?.geometry?.coordinates as LngLatLike;

	if (coords) geocodeCache[address] = coords;
	return coords;
}

// export async function geocodeMapbox(address: string) {
// 	const data = await (
// 		await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${PUBLIC_MAPBOX_ACCESS_TOKEN}&limit=1`)
// 	).json();
// 	return data.features[0].center as LngLatLike;
// }
