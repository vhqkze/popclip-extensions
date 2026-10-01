interface Engine {
    id: string;
    name: string;
    url: string;
    icon?: string;
}

// prettier-ignore
const engines: Engine[] = [
    {id: 'google', name: 'Google', url: 'https://www.google.com/search?q=***', icon: 'iconify:mingcute:google-fill'},
    {id: 'kagi', name: 'Kagi', url: 'https://kagi.com/search?q=***', icon: 'iconify:simple-icons:kagi'},
    {id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=***', icon: 'iconify:uil:bing'},
    {id: 'baidu', name: 'Baidu', url: 'https://www.baidu.com/s?wd=***', icon: 'iconify:ri:baidu-fill'},
    {id: 'brave', name: 'Brave', url: 'https://search.brave.com/search?q=***', icon: 'iconify:lineicons:brave'},
    {id: 'duckduckgo', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=***', icon: 'iconify:simple-icons:duckduckgo'},
    {id: 'ecosia', name: 'Ecosia', url: 'https://www.ecosia.org/search?q=***', icon: 'iconify:simple-icons:ecosia'},
    {id: 'naver', name: 'NAVER', url: 'https://search.naver.com/search.naver?query=***', icon: 'iconify:simple-icons:naver'},
    {id: 'startpage', name: 'Startpage', url: 'https://www.startpage.com/sp/search?query=***', icon: 'iconify:simple-icons:startpage'},
    {id: 'wiki', name: 'Wiki', url: 'https://en.wikipedia.org/wiki/Special:Search?search=***', icon: 'iconify:meteor-icons:wikipedia'},
    {id: 'yahoo', name: 'Yahoo', url: 'https://search.yahoo.com/search?p=***', icon: 'iconify:mdi:yahoo'},
    {id: 'yandex', name: 'Yandex', url: 'https://yandex.com/search/?text=***', icon: 'iconify:thesvg:yandex'},
    {id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/results?search_query=***', icon: 'iconify:mdi:youtube'},
];

// 动态生成 options：包含主搜索模板 + 每个引擎的开关
const options: Option[] = [
    {
        identifier: 'default_engine',
        type: 'multiple',
        values: engines.map((e) => e.url),
        valueLabels: engines.map((e) => e.name),
        defaultValue: engines[0].url,
        label: 'Default Engine',
        allowOther: true,
    },
    ...engines.map(
        (e) =>
            ({
                identifier: `enable_${e.id}`,
                type: 'boolean',
                label: `Enable ${e.name}`,
                defaultValue: true,
            }) as Option,
    ),
];

interface MyOptions {
    default_engine: string;
    [key: string]: any; // 允许动态的 enable_xxx 属性
}

const openurl = async (templateUrl: string, text: string) => {
    try {
        await popclip.openTemplateUrl(templateUrl, text);
    } catch {
        throw popclip.settingsRequiredError('Bad search URL');
    }
};

defineExtension<MyOptions>({
    options,
    actions: (input, options) => {
        if (input.text === '') {
            return;
        }

        const submenu = engines
            .filter((e) => options[`enable_${e.id}`] === true)
            .map((e) => ({
                title: e.name,
                icon: e.icon,
                code: () => openurl(e.url, input.text),
            }));

        return {
            icon: engines.find((e) => e.url === options.default_engine)?.icon ?? 'bundle:search',
            code: () => openurl(options.default_engine, input.text),
            submenu: submenu,
        };
    },
});
