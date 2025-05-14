export const action: ActionFunction = (input, options, context) => {
    let url = new URL('things:///add');
    let content: string = input.text.trim();
    if (options.withAppName) {
        content += ` #${context.appName}`;
    }
    url.searchParams.append('title', content);
    const pageUrl: string = context.browserUrl;
    const pageTitle: string = context.browserTitle;
    if (pageUrl && pageTitle) {
        const note: string = `[${pageTitle}](${pageUrl})`;
        url.searchParams.append('notes', note);
    }
    url.searchParams.append('show-quick-entry', options.showQuickEntry.toString());
    url.searchParams.append('reveal', options.reveal.toString());
    popclip.openUrl(url);
};
