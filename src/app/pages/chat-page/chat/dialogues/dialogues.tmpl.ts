export const tmplDialogues = `
    <div class="dialogues" id="dialogues">
        {{#each dialogues as | dialog |}}
        {{#with dialog}}
            {{#each messages as | oneMessage |}}
            {{#with oneMessage}}
            <div class="dialogues__message-wrapper">
                <div class="dialogues__avatar">
                    {{#if userAvatar}}
                    <img class="dialogues__img" src="https://ya-praktikum.tech/api/v2/resources{{userAvatar}}" alt="">
                    {{/if}}
                </div>
                <div class="message message_{{ from }}">
                    <div class="message__name">{{ name }}</div>
                    {{ content }}
                    <div class="message__time">
                        {{ timeCustomFormat }}
                    </div>
                </div>
            </div>
            {{/with}}
            {{/each}}
            <div class="message__date">{{ date }}</div>
        {{/with}}
        {{/each}}
        <p id="load-more-messages" class="dialogues__more-messages">Load more messages</p>
    </div>
`;
