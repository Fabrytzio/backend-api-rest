export const zipWith = (fn:Function, a:Array<any>, b:Array<any>):Array<any> => {
    let res = [];
    let idx = 0;
    let len = Math.min(a.length, b.length);

    while (idx < len) {
        res[idx] = fn(a[idx], b[idx]);
        idx += 1;
    }

    return res;
}