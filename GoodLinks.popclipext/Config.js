// # popclip
// name: GoodLinks
// identifier: vhqkze.goodlinks
// description: Save the selected link or current browser page to GoodLinks.
// icon: GoodLinks.svg
// popclip version: 4151
// app:
//   name: GoodLinks
//   link: https://goodlinks.app/
//   bundle identifiers:
//     - com.ngocluu.goodlinks
//   check installed: true
// entitlements: [dynamic]
// language: javascript
// module: true

module.exports = {
    actions() {
        const text = popclip.input.text.trim();
        let save_url = null;
        if (/^https?:\/\//.test(text)) {
            save_url = text;
        } else if (/^https?:\/\//.test(popclip.context.browserUrl)) {
            save_url = popclip.context.browserUrl;
        }
        if (save_url === null) {
            return;
        }

        return {
            code() {
                 let url = new URL('goodlinks://x-callback-url/save');
                 url.searchParams.append('url', save_url);
                popclip.openUrl(url.href);
            },
        };
    },
};
