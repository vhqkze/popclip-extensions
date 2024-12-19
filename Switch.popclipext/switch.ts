function createBiMap(input: {[key: string]: string}): Map<string, string> {
    const biMap = new Map<string, string>();
    Object.entries(input).forEach(([key, value]) => {
        biMap.set(key.toLowerCase(), value.toLowerCase());
        biMap.set(value.toLowerCase(), key.toLowerCase());
    });
    return biMap;
}

function getOption(option: string): {[key: string]: string} {
    const result: {[key: string]: string} = {};
    const pairs = option.split(',');

    pairs.forEach((pair) => {
        const trimmedPair = pair.trim();
        if (trimmedPair === '') {
            return;
        }
        const parts = trimmedPair.split('-').map((part) => part.trim());
        if (parts.length === 2 && parts[0] && parts[1]) {
            result[parts[0]] = parts[1];
        }
    });
    return result;
}

// @ts-ignore
export const actions: PopulationFunction = (selection, options) => {
    if (selection.text.length < 1 || selection.text.length > 10) {
        return;
    }
    const words = getOption(options.words);
    const mapping = createBiMap(words);

    const text = selection.text.trim();
    let result = mapping.get(text.toLowerCase()) ?? null;
    if (result === null) {
        return;
    }
    if (text === text.toUpperCase()) {
        result = result.toUpperCase();
    } else if (text === text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()) {
        result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
    }

    return {
        title: result,
        icon: null,
        code: () => result,
    };
};
