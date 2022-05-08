/* 
NOTE:
This file serves two purposes:
1. clarifies typings for components
2. Prevents having to import the entire Vime library when dynamically importing
*/

import type { Player, Hls, DefaultUi, Video } from '@vime/svelte';

export type PlayerType = typeof Player;
export type HlsType = typeof Hls;
export type DefaultUiType = typeof DefaultUi;
export type VideoType = typeof Video;

export { DefaultUi, Player, Hls, Video } from '@vime/svelte';
