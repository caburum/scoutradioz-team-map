<script lang="ts">
	import mapboxgl, { Map, Marker, Popup } from 'mapbox-gl';
	import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	import { avatarSize } from '$lib/firstmap';
	export let data: PageData;

	mapboxgl.accessToken = PUBLIC_MAPBOX_ACCESS_TOKEN;

	let mapContainer: HTMLDivElement,
		map: Map,
		isMapLoaded = false;

	onMount(async () => {
		if (map) return; // initialize map only once
		map = new Map({
			container: mapContainer,
			style: 'mapbox://styles/mapbox/dark-v11',
			projection: {
				name: 'mercator' // 2d
			},
			center: [-81.4205, 39.8282],
			zoom: 3
		});

		map.on('load', () => {
			isMapLoaded = true;
		});

		for (const team of data.teams) {
			if (!team.location) return console.error('No location for team', team.team_number);

			let marker;
			if (team.avatarLocation) {
				const icon = document.createElement('div');
				icon.style.backgroundImage = 'url(/api/avatars.png)';
				// icon.style.backgroundColor = '#fff';
				icon.style.width = `${avatarSize}px`;
				icon.style.height = `${avatarSize}px`;
				icon.style.backgroundPosition = `-${team.avatarLocation.x}px -${team.avatarLocation.y}px`;

				marker = new Marker(icon);
			} else marker = new Marker();

			marker
				.setLngLat(team.location)
				.setPopup(new Popup().setText(`Team ${team.team_number}: ${team.nickname}`))
				.addTo(map);
		}
	});
</script>

<div class="mapContainer" bind:this={mapContainer} />

<style>
	.mapContainer {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
