export const tmpl = `
    <div class="chat-list">
        <div class="chat-list__header">
            <input value="{{ value }}" 
                id="input-search" 
                autocomplete="off" 
                placeholder="Search" 
                class="chat-list__search">
        </div>
        <div class="chat-list__available-chats">
        {{{ chatCards }}}
        </div>
    </div>
`;
