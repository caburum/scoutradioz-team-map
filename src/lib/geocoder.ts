import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
import type { LngLatLike } from 'mapbox-gl';

export const geocodeCache: {
	[key: string]: LngLatLike;
} = {};

export function tbaToAddress(team: TbaTeam) {
	return [team.school_name, team.city, team.state_prov, team.postal_code, team.country].filter(Boolean).join(', ');
}

export async function geocode(address: string, retry = false): Promise<LngLatLike | undefined> {
	if (geocodeCache[address]) return geocodeCache[address];
	console.log('querying geocoder for', address);

	const data = await (await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`)).json();
	const coords = data.features?.[0]?.geometry?.coordinates as LngLatLike;

	console.error(data);

	if (coords) geocodeCache[address] = coords;
	else if (!retry) {
		// there's some really weird bug but trying with less details seems to work
		// let newAddress = address.split(', '); newAddress.pop();
		return await geocode(address.split(', ').slice(1).join(', '), true);
	}

	return coords;
}

// export async function geocodeMapbox(address: string) {
// 	const data = await (
// 		await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${PUBLIC_MAPBOX_ACCESS_TOKEN}&limit=1`)
// 	).json();
// 	return data.features[0].center as LngLatLike;
// }
