<script lang="ts">
	type IconName = 'play';
	type Icon = {
		box: number;
		meta?: string;
		svg: string;
	};

	export let name: IconName;
	export let size = '1em';
	export let color = 'currentColor';

	let _class = '';
	export { _class as class };

	const icons: Record<IconName, Icon> = {
		play: {
			box: 30,
			meta: 'ios glyph',
			svg: `<path fill="${color}" d="M 6 3 A 1 1 0 0 0 5 4 A 1 1 0 0 0 5 4.0039062 L 5 15 L 5 25.996094 A 1 1 0 0 0 5 26 A 1 1 0 0 0 6 27 A 1 1 0 0 0 6.5800781 26.8125 L 6.5820312 26.814453 L 26.416016 15.908203 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26.388672 14.078125 L 6.5820312 3.1855469 L 6.5800781 3.1855469 A 1 1 0 0 0 6 3 z" />`
		}
	};

	let icon = icons[`${name}`];
</script>

<svg class={_class} viewBox="0 0 {icon.box} {icon.box}" width={size} height={size}
	>{@html icon.svg}</svg
>
