export const getAvatarData = async () => {
	return (await (await fetch('https://firstmap.github.io/data/avatars.json')).json()) as {
		sheet_size: number;
		locations: {
			[key: string]: {
				x: number;
				y: number;
			};
		};
	};
};
export const avatarImageUrl = 'https://firstmap.github.io/data/avatars.png';
export const avatarSize = 40;

export const getLocations = async () => {
	return (await (await fetch('https://firstmap.github.io/data/teams.json')).json()) as {
		team_number: number;
		lat: number;
		lng: number;
	}[];
};
