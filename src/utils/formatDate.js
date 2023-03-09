export const formatDateFull = date =>
    `${date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())}/${date.getMonth() > 8 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))}/${date.getFullYear()} ${date.getHours() > 9 ? date.getHours() : ('0' + date.getHours())}:${date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())}`

export const formatDateFullTime = date =>
    `${date.getHours() > 9 ? date.getHours() : ('0' + date.getHours())}:${date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())}:${date.getSeconds() > 9 ? date.getSeconds() : ('0' + date.getSeconds())} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

export function SplitTime(numberOfHours) {
    var Days = Math.floor(numberOfHours / 24);
    var Remainder = numberOfHours % 24;
    var Hours = Math.floor(Remainder);
    var Minutes = Math.floor(60 * (Remainder - Hours));
    return Days + " Ngày " + Hours + " Giờ "
}