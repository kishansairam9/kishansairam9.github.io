<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let container: HTMLDivElement;

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	function generateData() {
		return months.map((month) => ({
			month,
			value: Math.floor(Math.random() * 80) + 20
		}));
	}

	let data = $state(generateData());

	function randomize() {
		data = generateData();
	}

	onMount(() => {
		const margin = { top: 20, right: 30, bottom: 40, left: 50 };
		const width = 500;
		const height = 280;
		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		const svg = d3
			.select(container)
			.append('svg')
			.attr('viewBox', `0 0 ${width} ${height}`)
			.attr('class', 'd3-chart');

		const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

		// Scales
		const x = d3.scalePoint().domain(months).range([0, innerWidth]).padding(0.5);
		const y = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

		// Axes
		g.append('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(0,${innerHeight})`)
			.call(d3.axisBottom(x));

		g.append('g').attr('class', 'y-axis').call(d3.axisLeft(y).ticks(5));

		// Line generator
		const line = d3
			.line<{ month: string; value: number }>()
			.x((d) => x(d.month)!)
			.y((d) => y(d.value))
			.curve(d3.curveMonotoneX);

		// Path
		const path = g
			.append('path')
			.attr('class', 'line')
			.attr('fill', 'none')
			.attr('stroke', 'var(--color-accent)')
			.attr('stroke-width', 2.5);

		// Dots group
		const dots = g.append('g').attr('class', 'dots');

		// Tooltip
		const tooltip = d3
			.select(container)
			.append('div')
			.attr('class', 'tooltip')
			.style('opacity', 0);

		function update(newData: { month: string; value: number }[]) {
			// Update line with transition
			path.datum(newData).transition().duration(750).ease(d3.easeCubicInOut).attr('d', line);

			// Update dots
			const dotSelection = dots.selectAll<SVGCircleElement, { month: string; value: number }>('circle');
			const joined = dotSelection.data(newData, (d) => d.month);

			// Enter new dots
			joined
				.enter()
				.append('circle')
				.attr('r', 5)
				.attr('fill', 'var(--color-bg)')
				.attr('stroke', 'var(--color-accent)')
				.attr('stroke-width', 2)
				.attr('cx', (d) => x(d.month)!)
				.attr('cy', (d) => y(d.value))
				.style('cursor', 'pointer')
				.on('mouseenter', function (event, d) {
					d3.select(this).transition().duration(150).attr('r', 7);
					tooltip
						.style('opacity', 1)
						.html(`<strong>${d.month}</strong>: ${d.value}`)
						.style('left', event.offsetX + 10 + 'px')
						.style('top', event.offsetY - 10 + 'px');
				})
				.on('mouseleave', function () {
					d3.select(this).transition().duration(150).attr('r', 5);
					tooltip.style('opacity', 0);
				});

			// Update existing dots
			joined
				.transition()
				.duration(750)
				.ease(d3.easeCubicInOut)
				.attr('cx', (d) => x(d.month)!)
				.attr('cy', (d) => y(d.value));
		}

		// Initial render
		update(data);

		// Watch for data changes
		$effect(() => {
			update(data);
		});
	});
</script>

<div class="chart-container">
	<div class="chart-header">
		<h4>Monthly Activity</h4>
		<button onclick={randomize}>Randomize Data</button>
	</div>
	<div bind:this={container} class="chart"></div>
</div>

<style>
	.chart-container {
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: var(--space-4);
		margin: var(--space-4) 0;
	}

	.chart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-3);
	}

	h4 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
	}

	button {
		padding: var(--space-2) var(--space-3);
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all var(--transition-fast);
		font-family: var(--font-sans);
		color: var(--color-text);
	}

	button:hover {
		background: var(--color-border);
	}

	.chart {
		position: relative;
		width: 100%;
	}

	:global(.d3-chart) {
		width: 100%;
		height: auto;
	}

	:global(.d3-chart text) {
		fill: var(--color-text-secondary);
		font-family: var(--font-sans);
		font-size: 12px;
	}

	:global(.d3-chart .domain),
	:global(.d3-chart .tick line) {
		stroke: var(--color-border);
	}

	.chart :global(.tooltip) {
		position: absolute;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		padding: var(--space-2);
		font-size: 0.8125rem;
		pointer-events: none;
		box-shadow: var(--shadow-md);
		z-index: 10;
	}
</style>
