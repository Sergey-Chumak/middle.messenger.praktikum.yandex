export const tmplDialogues = `
    <div class="dialogues">
        {{#each dialogues as | dialog |}}
        {{#with dialog}}
            {{#each messages as | oneMessage |}}
            {{#with oneMessage}}
            <div class="dialogues__message-wrapper dialogues__message-wrapper_{{ from }}">
                <div class="message">
                    {{ message }}
                    <div class="message__info">
                        <div class="message__status message__status_{{ status }}"></div>
                        <div class="message__time">{{ time }}</div>
                    </div>
                </div>
            </div>
            {{/with}}
            {{/each}}
            <div class="message__date">{{ date }}</div>
        {{/with}}
        {{/each}}
    </div>
`;
