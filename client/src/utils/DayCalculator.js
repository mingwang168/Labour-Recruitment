exports.difference = (start, end) => {
    if(start === end) {
        return 1;
    }
    const day = 24 * 60 * 60 * 1000;
    let a = start.split("-");
    let b = end.split("-");
    let d1 = new Date(a[0], a[1]-1, a[2]);
    let d2 = new Date(b[0], b[1]-1, b[2]);
    let diff = Math.round(Math.abs((d1 - d2) / day));
    return `${diff} days`;
}

exports.convert = (date) => {
    let a = date.split("-");
    return new Date(a[0], a[1]-1, a[2]);
}