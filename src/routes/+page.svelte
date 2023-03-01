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
			center: [-50, 20],
			zoom: 2
		});

		map.on('load', () => {
			isMapLoaded = true;
		});

		// console.log(data.teams);
		for (const team of data.teams) {
			if (!team.location) {
				console.error('No location for team', team);
				continue;
			}

			const icon = document.createElement('div');
			icon.className = 'markerIcon';
			if (team.avatarLocation) {
				icon.style.backgroundPosition = `-${team.avatarLocation.x}px -${team.avatarLocation.y}px`;
			} else icon.className += ' first';

			// requested by impact team, hoist 102 to the top
			if (team.team_number == 102) icon.style.zIndex = '1';

			new Marker(icon)
				.setLngLat(team.location)
				.setPopup(new Popup().setText(`Team ${team.team_number}: ${team.nickname}`))
				.addTo(map);
		}

		// map.on('move', () => console.log(map.getCenter()));
	});
</script>

<div class="mapContainer" style:--avatar-size={`${avatarSize}px`} bind:this={mapContainer} />

<style>
	.mapContainer {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	:global(.markerIcon) {
		background-image: url(/api/avatars.png);
		background-color: #fff5;
		border-radius: 2px;
		width: var(--avatar-size);
		height: var(--avatar-size);
	}
	:global(.markerIcon.first) {
		background-image: url(/first.svg);
		background-color: unset;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
