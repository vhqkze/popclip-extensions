// download from https://momentjs.com/downloads/moment.js
import moment from 'moment';

// @ts-ignore
export const actions: PopulationFunction = (selection) => {
    if (selection.text.length < 5 || selection.text.length > 100) {
        return;
    }
    const text = selection.text.trim();
    let resultString = null;
    if (text.match(/^1\d{9}$/)) {
        resultString = moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
    } else if (text.match(/^1\d{12}$/)) {
        resultString = moment(parseInt(text)).format('YYYY-MM-DD HH:mm:ss');
    } else if (text.match(/^\d{4}[-\/\.]\d\d[-\/\.]\d\d \d\d:\d\d:\d\d$/)) {
        resultString = moment(text).format('X');
    } else {
        resultString = moment(text).format('YYYY-MM-DD HH:mm:ss');
    }

    if (resultString == 'Invalid date') {
        return;
    }

    return {
        title: resultString,
        icon: null,
        code: () => resultString,
    };
};
