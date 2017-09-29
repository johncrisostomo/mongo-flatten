module.exports = document => {
    const result = {};

    const traverse = (current, key) => {
        if (Object(current) !== current) {
            result[key] = current;
        } else if (Array.isArray(current)) {
            let len = current.length;

            for (let i = 0; i < len; i += 1) {
                traverse(current[i], key + '.' + i);
            }

            if (len === 0) {
                result[key] = [];
            }
        } else {
            let isEmpty = true;
            for (let k in current) {
                isEmpty = false;
                if (k === '_id') {
                    result[k] = current[k.toString()];
                } else {
                    traverse(current[k], key ? key + '.' + k : k);
                }
            }
            if (isEmpty && key) result[key] = {};
        }
    };

    traverse(document, '');

    return result;
};
