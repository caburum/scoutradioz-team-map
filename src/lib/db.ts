import { MongoClient } from 'mongodb';
import { MONGODB_URI, MONGODB_DB } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);

await client.connect();

export async function getTeamData(teams: number[]): Promise<TbaTeam[]> {
	return (await client
		.db(MONGODB_DB)
		.collection('teams')
		.aggregate([
			{ $match: { team_number: { $in: teams } } },
			{ $group: { _id: '$team_number', doc: { $first: '$$ROOT' } } },
			{ $replaceRoot: { newRoot: '$doc' } },
			{
				$project: {
					_id: 0,
					// null from tba
					address: 0,
					gmaps_place_id: 0,
					gmaps_url: 0,
					lat: 0,
					lng: 0,
					location_name: 0
				}
			}
		])
		.toArray()) as TbaTeam[];
}
