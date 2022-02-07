export const dialoguesTmpl = `
    <div class="dialogues" id="dialogues">
        {{#each dialogues as | dialog |}}
        {{#with dialog}}
            {{#each messages as | oneMessage |}}
            {{#with oneMessage}}
            <div class="dialogues__message-wrapper">
                <div id="{{ id }}" class="dialogues__avatar">
                    {{#if userAvatar}}
                    <img class="dialogues__img" src="https://ya-praktikum.tech/api/v2/resources{{userAvatar}}" 
                         alt="">
                    {{else}}
                    <span class="dialogues__initials">{{ initials }}</span>
                    {{/if}}
                </div>
                
                <div class="message message_{{ from }}">
                    {{#if name}}
                    <div id="{{ id }}" class="message__name">{{ name }}</div>
                    {{else}}
                    <div class="message__name">Anonymous</div>
                    {{/if}}
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
    </div>
`;
