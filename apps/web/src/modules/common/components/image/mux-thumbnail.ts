type Options = {
	height: number;
	time: number;
	width: number;
};

export const createImage =
	(playbackId: string) =>
	({ height, width, time }: Options) =>
		`https://image.mux.com/${playbackId}/thumbnail.jpg?fit_mode=crop&width=${width}&height=${height}&time=${time}`;
