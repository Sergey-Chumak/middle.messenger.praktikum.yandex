export const tmpl = `
    <div class="new-chat-modal-wrapper"> 
        <div class="new-chat-modal">
            <div>
                <div class="new-chat-modal__header">Create a chat</div>
                {{{ input }}}
            </div>
            
            <div class="new-chat-modal__buttons">
                {{{ confirmBtn }}}
                {{{ cancelBtn }}}
            </div>
        </div>
        <div class="modal-backdrop"></div>
    </div>
`;
