export const newChatModalTmpl = `
    <div class="new-chat-modal-wrapper"> 
        <div class="new-chat-modal">
            <div>
                <div class="new-chat-modal__header">Create a chat</div>
                
                <label for="create-chat-modal-input" class="new-chat-modal__label">Title</label>
                <input type="text" id="create-chat-modal-input" class="new-chat-modal__input" autocomplete="off">
            </div>
            
            <div class="new-chat-modal__buttons">
                {{{ confirmBtn }}}
                {{{ cancelBtn }}}
            </div>
        </div>
        <div class="modal-backdrop"></div>
    </div>
`;
