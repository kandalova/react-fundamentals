export function formatDuration(minutes: number): string {
	const hh = Math.floor(minutes / 60) | 0;
	const mm = minutes % 60 | 0;

	return `${hh < 10 ? '0' + hh : hh}:${mm < 10 ? '0' + mm : mm} ${
		hh === 1 ? 'hour' : 'hours'
	}`;
}
