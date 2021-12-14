export const tmpl = `
    {{#each chatCards as | chatCard|}}
    {{#with chatCard}}
    <div id="{{ id }}" class="chat-card chat-card_{{ status }}">
        <div class="chat-card__avatar"></div>
        <div class="chat-card__content-wrapper">
            <div class="chat-card__content">
                <div class="chat-card__name">{{ name }}</div>
                <div class="chat-card__last-message">{{ lastMessage }}</div>
            </div>
            <div class="chat-card__info">
                <div class="chat-card__time">{{ time }}</div>
                {{#if notifications}}
                <div class="chat-card__notifications">{{ notifications }}</div>
                {{/if}}
            </div>
        </div>
    </div>
    <div id="divider" class="chat-card__divider"></div>
    {{/with}}
    {{/each}}
`;
