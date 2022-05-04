<script lang="ts">
	type IconName = 'play' | 'caretRight' | 'arrowUpRight';
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
		},
		caretRight: {
			box: 30,
			meta: 'ios glyph',
			svg: `<path fill="${color}" d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z" />`
		},
		arrowUpRight: {
			box: 32,
			meta: 'kmg design Outline Color',
			svg: `<path fill="${color}" d="M32,1V17a1,1,0,0,1-2,0V3.414L1.707,31.707A1,1,0,0,1,.293,30.293L28.586,2H15a1,1,0,0,1,0-2H31a1,1,0,0,1,1,1Z" />`
		}
	};

	let icon = icons[`${name}`];
</script>

<svg class={_class} viewBox="0 0 {icon.box} {icon.box}" width={size} height={size}
	>{@html icon.svg}</svg
>
