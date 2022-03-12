export function getSellCronTabSchedule() {
    return `${evenMinutes()} ${marketHours()} * * ${marketDaysOfWeek()}`;
}

export function getBuyCronTabSchedule() {
    return `${oddMinutes()} ${marketHours()} * * ${marketDaysOfWeek()}`;
}

export function evenMinutes() {
    return '*/2';
}

export function oddMinutes() {
    return [...Array(60).keys()].filter(n => n % 2).join(',');
}

export function marketHours() {
    return process.env.ENV === 'development' ? '*' : '9-15';
}

export function marketDaysOfWeek() {
    return process.env.ENV === 'development' ? '*' : '1-5';
}
