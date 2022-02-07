export const chatTmpl = `
    <div class="chat">
        <div class="chat__header">
            <div id="chat-arrow-back" class="chat__back"></div>
        
            <div class="chat__chat-info-wrapper"> 
                <div class="chat__avatar">
                    {{#if avatar}}
                    <img src="https://ya-praktikum.tech/api/v2/resources{{ avatar }}" alt="">
                    {{else}}
                    <div class="chat__avatar-initials">{{ initials }}</div>
                    {{/if}}
                </div>
                <div class="chat__chat-info">
                    <div class="chat__name">{{ name }}</div>
                    <div id="chat-users" class="chat__users">{{ users }}</div>
                </div>
            </div>
            
           <div class="chat__actions">
                <div id="chat-edit-users" class="chat__edit-users"></div>
                <div id="context-menu-icon" class="chat__context-menu-icon"></div>
           </div>
           
            <div id="chat-context-menu" class="chat__context-menu">
                <div id="option-change-avatar">Change chat avatar</div>
                <div id="option-leave-chat">Leave the chat</div>
                <div id="option-delete-chat">Delete chat</div>
            </div>
        </div>
        
        <div class="chat__message">{{{ dialogues }}}</div>
        
        <div class="chat__footer">
            <div class="chat__file"></div>
            <input value="{{ value }}"
                 id="message" 
                 autocomplete="off"
                 placeholder="Message" 
                 class="chat__message-input"
             />
            <div id="send-message-btn" class="chat__send-message-btn"></div>
        </div>
    </div>
`;
