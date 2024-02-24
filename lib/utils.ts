export function convertToObj(param: any) {
    param._id = param._id.toString();
    return param;
}

export function roundToTwo(num: number) {
    return Number(num.toFixed(2));
}
