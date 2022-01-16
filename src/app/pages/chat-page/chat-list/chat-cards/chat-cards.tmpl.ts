export const tmpl = `
    {{#each chatCards as | chatCard|}}
        {{#with chatCard}}
            {{#with chatCard.last_message as | message|}}
                {{#with message.user as | user|}}
                <div id="{{ chatCard.id }}" class="chat-card chat-card_{{ chatCard.status }}">
                    <div class="chat-card__avatar">
                        {{#if chatCard.avatar}}
                        <img class="chat-card__img" 
                            src="https://ya-praktikum.tech/api/v2/resources{{chatCard.avatar}}" alt="">
                        {{/if}}
                    </div>
                    <div class="chat-card__content-wrapper">
                        <div class="chat-card__content">
                            <div class="chat-card__name">{{ chatCard.title }}</div>
                            <div class="chat-card__last-message">{{ message.content }}</div>
                        </div>
                        <div class="chat-card__info">
                            <div class="chat-card__time">{{ message.time }}</div>
                            {{#if chatCard.unread_count}}
                            <div class="chat-card__notifications">{{ chatCard.unread_count }}</div>
                            {{/if}}
                        </div>
                    </div>
                </div>
                {{/with}}
                {{else}}
                <div id="{{ id }}" class="chat-card chat-card_{{ status }}">
                    <div class="chat-card__avatar">
                     {{#if chatCard.avatar}}
                        <img class="chat-card__img" 
                            src="https://ya-praktikum.tech/api/v2/resources{{chatCard.avatar}}" alt="">
                     {{/if}}
                    </div>
                    <div class="chat-card__content-wrapper">
                        <div class="chat-card__content">
                            <div class="chat-card__name">{{ chatCard.title }}</div>
                        </div>
                    </div>
                </div>
            {{/with}}
        {{/with}}
        {{else}}
            <div class="chat-cards__not-found">Chats not found</div>
    {{/each}}
`;
