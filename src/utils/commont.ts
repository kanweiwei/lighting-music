//数量过十万进行过滤
export const countFilter = (count: number | string, n = 0): string => {
    if (count > 10000) {
        return (Number(count) / 10000).toFixed(n) + "w";
    } else {
        return count + "";
    }
};

//转时间工具函数
export const toTime = (num: number) => {
    const date = new Date(num);

    //补零
    function str(n: any) {
        n = date.getMonth() + 1;
        if (n < 10) {
            n = '0' + n;
        } else {
            n = n + '';
        }

        return n;
    }

    return date.getFullYear() + '.' + str(date.getMonth() + 1) + '.' + str(date.getDay());
}