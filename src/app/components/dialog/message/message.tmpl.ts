export const tmpl = `
    <div class="messages-wrapper">
        {{#each messages as | messageOne |}}
        {{#with messageOne}}
        <div class="message-wrapper message-wrapper_{{ from }}">
            <div class="message">
                {{ message }}
                <div class="message__info">
                    <div class="message__status message__status_{{ status }}"></div>
                    <div class="message__date">{{ time }}</div>
                </div>
            </div>
        </div>
        {{/with}}
        {{/each}}
    </div>
`;
