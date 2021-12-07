export const tmpl = `
    <div class="chat">
        <div class="chat__header">
            <div class="chat__user">
                <div class="chat__avatar"></div>
                <div class="chat_name">{{ name }}</div>
            </div>
            <div class="chat__context-menu"></div>
        </div>
        <div class="chat__message">{{{ dialogues }}}</div>
        <div class="chat__footer">
            <div class="chat__file"></div>
            <input value="{{ value }}"
                {{#if disabled}}disabled{{/if}}
                 id="message" 
                 placeholder="Message" 
                 class="chat__message-input"
             />
            <div id="send-message-btn" class="chat__send-message-btn"></div>
        </div>
    </div>
`;
