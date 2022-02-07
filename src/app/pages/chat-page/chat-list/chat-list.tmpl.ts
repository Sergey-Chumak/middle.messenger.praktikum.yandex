export const chatListTmpl = `
    <div class="chat-list">
        <div class="chat-list__header">
            <div id="setting-icon" class="chat-list__icon setting"></div>
            <div id="new-chat-icon" class="chat-list__icon new-chat"></div>
            <input id="input-search" 
                   autocomplete="off" 
                   placeholder="Search" 
                   class="chat-list__search">
        </div>
        
        <div class="chat-list__available-chats">
            {{{ chatCards }}}
        </div>
    </div>
`;
