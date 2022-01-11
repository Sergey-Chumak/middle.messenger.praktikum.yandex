export const tmpl = `
    <div class="chat">
    {{{ modal }}}
        <div class="chat__header">
            <div class="chat__user">
                <div class="chat__name">
                    <div>{{ name }}</div>
                    <div>{{ users }}</div>
                </div>
            </div>
            <div id="context-menu-icon" class="chat__context-menu-icon"></div>
            <div id="chat-context-menu" class="chat__context-menu"> 
                <div id="option-add-user">Add user</div>
                <div id="option-change-avatar">Change avatar</div>
                <div id="option-delete-chat">Delete chat</div>
            </div>
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
