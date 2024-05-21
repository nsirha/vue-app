<script setup>
	import { onMounted } from 'vue';

	mapboxgl.accessToken =
		'pk.eyJ1IjoiZW5nYWdlaW50ZXJhY3RpdmUiLCJhIjoiY2xvNDV4b20zMWc4NzJqcXVnYTJrYXI0cSJ9.wn2ZmVsrq_PCva1ky4apmw';

	const initMap = () => {
		console.log('initMap');

		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/engageinteractive/clo46rqbe00hw01qxdtne1073',
			center: [-1.549077, 53.800755],
			zoom: 3,
		});

		const mapTwo = new mapboxgl.Map({
			container: 'map-two',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-1.549077, 53.800755],
			zoom: 2,
		});

		map.addControl(new mapboxgl.NavigationControl());
		mapTwo.addControl(new mapboxgl.NavigationControl());

		map.on('load', () => {
			console.log('loaded');

			map.loadImage('/assets/images/e-icon.png', (error, image) => {
				if (error) throw error;

				map.addImage('cat', image);

				map.addSource('places', {
					type: 'geojson',
					data: {
						type: 'FeatureCollection',
						features: [
							{
								type: 'Feature',
								properties: {
									description: `<strong>LEEDS</strong>
										<p>UK Floods - North England and East Midlands</p>
										<p>Date: <strong>8th November 2019</strong></p>
										<p>Event Type: Flooding</p>
										<p>Response Type Commentary Report; Footprint</p>
										<p>The north of England and East Midlands experiences severe rainfall and flooding over recent days, with Sheffield and Doncaster particularly affected, as well as nearby towns and villages.</p>
										<p><a href="https://www.google.co.uk">Learn more -></a></p>`,
									icon: 'border-dot-13',
								},
								geometry: {
									type: 'Point',
									coordinates: [-1.549077, 53.800755],
								},
							},
							{
								type: 'Feature',
								properties: {
									description:
										'<strong>LONDON</strong><p>This is the para</p><a href="https://www.google.co.uk">This is the link</a>',
									icon: 'theatre',
								},
								geometry: {
									type: 'Point',
									coordinates: [-0.127758, 51.507351],
								},
							},
							{
								type: 'Feature',
								properties: {
									description:
										'<strong>GLASGOW</strong><p>This is the para</p><a href="https://www.google.co.uk">This is the link</a>',
									icon: 'theatre',
								},
								geometry: {
									type: 'Point',
									coordinates: [-4.251806, 55.864239],
								},
							},
						],
					},
				});

				// map.addLayer({
				// 	id: 'places',
				// 	type: 'symbol',
				// 	source: 'places',
				// 	layout: {
				// 		// 'icon-image': ['get', 'icon'],
				// 		'icon-allow-overlap': true,
				// 		'icon-image': 'cat',
				// 		'icon-size': 0.75,
				// 	},
				// });

				map.addLayer({
					id: 'places',
					type: 'circle',
					source: 'places',
					paint: {
						'circle-color': '#fe0',
						'circle-radius': 5,
						'circle-stroke-width': 2,
						'circle-stroke-color': '#ff585d',
					},
				});
			});

			map.on('click', 'places', (e) => {
				const coordinates = e.features[0].geometry.coordinates.slice();
				const description = e.features[0].properties.description;

				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
			});

			map.on('mouseenter', 'places', () => {
				map.getCanvas().style.cursor = 'pointer';
			});

			map.on('mouseleave', 'places', () => {
				map.getCanvas().style.cursor = '';
			});
		});

		mapTwo.on('load', () => {
			console.log('loaded two');

			mapTwo.addSource('placestwo', {
				type: 'geojson',
				data: '/assets/data.geojson',
				cluster: true,
				clusterMaxZoom: 14,
				clusterRadius: 30,
			});

			mapTwo.addLayer({
				id: 'clusters',
				type: 'circle',
				source: 'placestwo',
				filter: ['has', 'point_count'],
				paint: {
					// Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
					// with three steps to implement three types of circles:
					//   * Blue, 20px circles when point count is less than 100
					//   * Yellow, 30px circles when point count is between 100 and 750
					//   * Pink, 40px circles when point count is greater than or equal to 750
					'circle-color': [
						'step',
						['get', 'point_count'],
						'#51bbd6', // blue
						5,
						'#f1f075', // yellow
						15,
						'#f28cb1', // pink
					],
					'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
				},
			});

			mapTwo.addLayer({
				id: 'cluster-count',
				type: 'symbol',
				source: 'placestwo',
				filter: ['has', 'point_count'],
				layout: {
					'text-field': ['get', 'point_count_abbreviated'],
					'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
					'text-size': 12,
				},
			});

			mapTwo.addLayer({
				id: 'unclustered-point',
				type: 'circle',
				source: 'placestwo',
				filter: ['!', ['has', 'point_count']],
				paint: {
					'circle-color': '#11b4da',
					'circle-radius': 5,
					'circle-stroke-width': 3,
					'circle-stroke-color': '#fff',
				},
			});

			// inspect a cluster on click
			mapTwo.on('click', 'clusters', (e) => {
				const features = mapTwo.queryRenderedFeatures(e.point, {
					layers: ['clusters'],
				});
				const clusterId = features[0].properties.cluster_id;
				mapTwo.getSource('placestwo').getClusterExpansionZoom(clusterId, (err, zoom) => {
					if (err) return;

					mapTwo.easeTo({
						center: features[0].geometry.coordinates,
						zoom: zoom,
					});
				});
			});

			// When a click event occurs on a feature in
			// the unclustered-point layer, open a popup at
			// the location of the feature, with
			// description HTML from its properties.
			mapTwo.on('click', 'unclustered-point', (e) => {
				const coordinates = e.features[0].geometry.coordinates.slice();
				const location = e.features[0].properties.location;
				const heading = e.features[0].properties.heading;
				const date = e.features[0].properties.date;
				const event = e.features[0].properties.event;
				const response = e.features[0].properties.response;
				const copy = e.features[0].properties.copy;
				const link = e.features[0].properties.link;

				// Ensure that if the mapTwo is zoomed out such that
				// multiple copies of the feature are visible, the
				// popup appears over the copy being pointed to.
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				new mapboxgl.Popup()
					.setLngLat(coordinates)
					.setHTML(
						`
							<p class="text-red-500">${location}</p>
							<strong class="uppercase">${heading}</strong>
							<p class="mt-2">Date: <strong>${date}</strong></p>
							<p>Event Type: ${event}</p>
							<p>Response Type: ${response}</p>
							<p class="mt-2">${copy}</p>
							<a href="${link}" class="block mt-2 hover:underline">Learn more &rarr;</a>
						`
					)
					.addTo(mapTwo);
			});

			mapTwo.on('mouseenter', 'placestwo', () => {
				mapTwo.getCanvas().style.cursor = 'pointer';
			});

			mapTwo.on('mouseleave', 'placestwo', () => {
				mapTwo.getCanvas().style.cursor = '';
			});
		});
	};

	onMounted(() => {
		initMap();
	});
</script>

<template>
	<section>
		<div class="container">
			<div id="map"></div>

			<div id="map-two"></div>
		</div>
	</section>
</template>

<style scoped>
	section {
		@apply bg-red-300;
	}

	.container {
		@apply max-w-6xl mx-auto py-8 px-8 md:px-0;
	}

	#map {
		@apply w-full h-[500px] bg-green-200;
	}

	#map-two {
		@apply w-full h-[500px] mt-12 bg-green-300;
	}
</style>
