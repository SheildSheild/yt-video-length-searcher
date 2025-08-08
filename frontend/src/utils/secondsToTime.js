export default function timeFormat(duration){
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    if (hours > 0){
        return `${hours}:${paddedMinutes}:${paddedSeconds}`
    } else {
        return `${paddedMinutes}:${paddedSeconds}`
    }
}