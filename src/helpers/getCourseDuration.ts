export function formatDuration(minutes: number): string {
	const hh = Math.floor(minutes / 60) | 0;
	const mm = (minutes % 60 | 0).toString();

	return `${hh.toString().padStart(2, '0')}:${mm.padStart(2, '0')} ${
		hh === 1 ? 'hour' : 'hours'
	}`;
}
