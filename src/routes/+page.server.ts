import type { PageServerLoad } from './$types';
import { geocode, tbaToAddress } from '$lib/geocoder';
import { getTeamData } from '$lib/db';
import type { LngLatLike } from 'mapbox-gl';
import { getAvatarData, getLocations } from '$lib/firstmap';
import teamNumbers from './teams.json';

type SupplementaryTeamData = {
	location?: LngLatLike;
	avatarLocation?: { x: number; y: number };
};

export const load: PageServerLoad = async () => {
	let teams: (TbaTeam & SupplementaryTeamData)[] = await getTeamData(teamNumbers.sort().reverse());
	// for (const team of teams) team.location = await geocode(tbaToAddress(team));

	const [avatarData, locations] = await Promise.all([getAvatarData(), getLocations()]);

	// use firstmap data
	for (const team of teams) {
		let locEntry = locations.find((loc) => loc.team_number === team.team_number);
		if (locEntry) team.location = [locEntry.lng, locEntry.lat];
		else team.location = await geocode(tbaToAddress(team));

		team.avatarLocation = avatarData.locations[team.team_number];
	}

	return { teams };
};
