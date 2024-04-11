export default function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let durationString = '';

    if (hours > 0) {
        durationString += `${hours} hour${hours > 1 ? 's' : ''}`;
    }

    if (minutes > 0) {
        durationString += ` ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return durationString.trim() || '0 minutes';
}
