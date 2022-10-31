export function formatDuration(minutes: number | string): string {
	const minutesNumber = Number(minutes);
	if (minutesNumber) {
		const hh = Math.floor(minutesNumber / 60) | 0;
		const mm = (minutesNumber % 60 | 0).toString();

		return `${hh.toString().padStart(2, '0')}:${mm.padStart(2, '0')} ${
			hh === 1 ? 'hour' : 'hours'
		}`;
	}
	return '';
}
