// # popclip
// name: Anybox
// identifier: vhqkze.anybox
// description: Save current browser page to Anybox.
// icon: iconify:gravity-ui:bookmark
// popclip version: 4151
// app:
//   name: Anybox
//   link: https://anybox.app/
//   bundle identifiers:
//     - cc.anybox.Anybox
//   check installed: true
// entitlements: [dynamic]
// language: javascript
// module: true

module.exports = {
    actions() {
        const page_url = popclip.context.browserUrl;
        if (page_url === '') {
            return;
        }

        return {
            code() {
                let url = new URL('anybox://quick-save');
                popclip.openUrl(url.href);
            },
        };
    },
};
