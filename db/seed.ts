import { Level, db } from 'astro:db';

const collections = [
	6,   //Microban 01
	12,  //Microban 02
	89,  //Microban 03
	205, //Microban 04
];

interface ApiLevel {
	id: number;
	width: number;
	height: number;
	map: string;
	blue_moves: number;
	blue_pushes: number;
}

// https://astro.build/db/seed
export default async function seed() {
	const queryparams = new URLSearchParams({
		key: import.meta.env.LLOGIC_API_KEY,
	});
	for (const collection of collections) {
		const res = await fetch(`${import.meta.env.LLOGIC_URL}/collection/${collection}?${queryparams}`);
		const data: ApiLevel[] = await res.json();
		
		const levels = data.map((level) => ({
			id: level.id,
			width: level.width,
			height: level.height,
			map: level.map,
			moves: level.blue_moves,
			pushes: level.blue_pushes,
		}));
		await db.insert(Level).values(levels);
	}
}
