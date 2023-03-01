import type { PageServerLoad } from './$types';
import { geocode, tbaToAddress } from '$lib/geocoder';
import { getTeamData } from '$lib/db';
import type { LngLatLike } from 'mapbox-gl';
import { getAvatarData, getLocations } from '$lib/firstmap';
import Papa from 'papaparse';
import { CSV_URL } from '$env/static/private';

type SupplementaryTeamData = {
	location?: LngLatLike;
	avatarLocation?: { x: number; y: number };
};

interface SheetData {
	'Team #': number;
	Status: 'Active' | 'Onboarded' | string;
	Latitude: number | undefined;
	Longitude: number | undefined;
}

export const load: PageServerLoad = async () => {
	let sheetData: SheetData[] = [];
	await fetch(CSV_URL)
		.then((resp) => resp.text())
		.then((text) => {
			Papa.parse(text, {
				delimiter: ',',
				header: true,
				dynamicTyping: true,
				complete: (results) => {
					sheetData = (results.data as unknown as SheetData[]).filter((row) => ['Active', 'Onboarded'].includes(row['Status']));
				}
			});
		});

	let teamNumbers = sheetData.map((row) => row['Team #']);
	let teams: (TbaTeam & SupplementaryTeamData)[] = await getTeamData(teamNumbers);
	// for (const team of teams) team.location = await geocode(tbaToAddress(team));

	const [avatarData, locations] = await Promise.all([getAvatarData(), getLocations()]);

	// use firstmap data
	for (const team of teams) {
		let row = sheetData.find((row) => row['Team #'] === team.team_number);

		if (row?.Latitude && Number.isFinite(row.Latitude) && row?.Longitude && Number.isFinite(row.Longitude)) {
			team.location = [row.Longitude, row.Latitude];
		} else {
			let locEntry = locations.find((loc) => loc.team_number === team.team_number);
			if (locEntry) team.location = [locEntry.lng, locEntry.lat];
			else team.location = await geocode(tbaToAddress(team));
		}

		team.avatarLocation = avatarData.locations[team.team_number];
	}

	return { teams: teams.sort((a, b) => b.team_number - a.team_number) };
};
