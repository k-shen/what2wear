import { TOPS, UNLAYERABLE_TOP_INDICIES } from '../model/model';

export const max = (n1, n2) => {
    return n1 > n2 ? n1 : n2;
};

export const min = (n1, n2) => {
    return n1 < n2 ? n1 : n2;
};

export const extractXHours = () => {};

export const maxWarmth = () => {
    let sum = TOPS.reduce((total, clothes, idx) => {
        if (UNLAYERABLE_TOP_INDICIES.includes(idx)) return total;
        return total + clothes.warmth;
    }, 0);

    sum -= TOPS[0].warmth;
    sum += TOPS[UNLAYERABLE_TOP_INDICIES[0]].warmth;

    return sum;
};

export const getWarmth = (options) => {
    let sum = 0;
    for (let i = 0; i < options.length; i++) {
        sum += TOPS[options[i]].warmth;
    }

    return sum;
};
