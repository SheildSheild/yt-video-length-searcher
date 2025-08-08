export default function parseDuration(duration){
    const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    if(!matches) return 0;

    const [, hours, minutes, seconds] = matches;
    const timeParts = [hours, minutes, seconds].map(part => parseInt(part) || 0);
    const multipliers = [3600, 60, 1];

    return timeParts.reduce((total, value, index) => total + (value * multipliers[index]), 0);
}