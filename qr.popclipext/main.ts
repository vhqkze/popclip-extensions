const options: Option[] = [
    {
        identifier: 'ontop',
        type: 'boolean',
        label: '置顶',
        defaultValue: true,
    },
    {
        identifier: 'trim_string',
        type: 'boolean',
        label: '移除首尾空格(trim)',
        defaultValue: true,
    },
    {
        identifier: 'remove_invisible',
        type: 'boolean',
        label: '移除首尾不可见字符(不包含空格)',
        defaultValue: true,
    },
] as const;

interface qrOptions {
    ontop: boolean;
    trim_string: boolean;
    remove_invisible: boolean;
}

const show = async (command: string, text: string, options: qrOptions) => {
    if (options.ontop && command.startsWith('open')) {
        command += ' --ontop';
    }
    if (options.trim_string) {
        text = text.trim();
    }
    if (options.remove_invisible) {
        text = text.replace(/^[\p{Cf}\ufffc]+|[\p{Cf}\ufffc]+$/gu, '');
    }
    const {status, stderr} = await popclip.runShellScript(command, {
        interpreter: 'zsh',
        shellMode: 'login',
        env: {POPCLIP_TEXT: text},
    });
    if (status != 0 || stderr !== '') {
        popclip.showText(stderr);
    }
    if (status == 0 && !command.startsWith('open')) {
        popclip.showSuccess();
    }
};

defineExtension<qrOptions>({
    options,
    actions: [
        {
            code: async (input, options) => {
                let command = `open -a /usr/local/bin/dialog --args --image base64=$(qrencode "$POPCLIP_TEXT" --type=SVG --background=f4f4f4 -o - | base64) --hideicon --width 300 --style alert --resizable --moveable`;
                if (popclip.modifiers.shift) {
                    command = `qrencode "$POPCLIP_TEXT" --type=PNG --background=f4f4f4 -o - | swift -e 'import Cocoa; NSPasteboard.general.clearContents(); NSPasteboard.general.setData(FileHandle.standardInput.readDataToEndOfFile(), forType: .png)'`;
                    show(command, input.text, options);
                    return;
                }
                show(command, input.text, options);
            },
            submenu: [
                {
                    title: 'barcode',
                    icon: 'iconify:material-symbols:barcode',
                    code: async (input, options) => {
                        let command = `open -a /usr/local/bin/dialog --args --image base64=$(zint -b 20 -d "$POPCLIP_TEXT" --whitesp=10 --vwhitesp=10 --bg=f4f4f4 --filetype=SVG --direct | base64) --hideicon --width 500 --style alert --resizable`;
                        if (popclip.modifiers.shift) {
                            command = `zint -b 20 -d "$POPCLIP_TEXT" --whitesp=10 --vwhitesp=10 --bg=f4f4f4 --filetype=PNG --direct | swift -e 'import Cocoa; NSPasteboard.general.clearContents(); NSPasteboard.general.setData(FileHandle.standardInput.readDataToEndOfFile(), forType: .png)'`;
                            show(command, input.text, options);
                            return;
                        }
                        show(command, input.text, options);
                    },
                },
            ],
        },
    ],
});
