export const tmplDialogues = `
    <div class="dialogues">
        {{#each dialogues as | dialog |}}
        {{#with dialog}}
            {{#each messages as | oneMessage |}}
            {{#with oneMessage}}
            <div class="dialogues__message-wrapper dialogues__message-wrapper_{{ from }}">
                <div class="dialogues__avatar">
                    {{#if userAvatar}}
                    <img class="dialogues__img" src="https://ya-praktikum.tech/api/v2/resources{{userAvatar}}" alt="">
                    {{/if}}
                </div>
                <div class="message">
                    <div class="message__name">{{ name }}</div>
                    {{ content }}
                    <div class="message__info">
                        <div class="message__status message__status_{{ status }}"></div>
                        <div class="message__time">{{ timeCustomFormat }}</div>
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
