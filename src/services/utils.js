class Utils {

    groupBy(list, keyFunc) {
        const map = new Map();
        list.forEach(itm => {
            const key = keyFunc(itm);
            const lst = map.get(key);
            if (!lst) {
                map.set(key, [itm]);
            } else {
                lst.push(itm);
            }
        });
        return map;
    }

    groupByToList(list, keyFunc) {
        const grouped = this.groupBy(list, keyFunc);
        let lst = [];
        for (let key of grouped.keys()) {
            lst.push({
                key: key,
                values: grouped.get(key),
            });
        }
        return lst;
    }
}

export default new Utils();