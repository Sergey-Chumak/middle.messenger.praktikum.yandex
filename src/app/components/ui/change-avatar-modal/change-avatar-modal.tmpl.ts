export const tmpl = `
    <div class="change-avatar-modal-wrapper"> 
        <div class="change-avatar-modal">
            <div class="change-avatar-modal__header">Change avatar</div>
            
            <input id="{{ inputId }}" class="change-avatar-modal__input" type="file">
            
            <div class="change-avatar-modal__buttons">
                {{{ confirmBtn }}}
                {{{ cancelBtn }}}
            </div>
        </div>
        <div class="change-avatar-modal-wrapper__backdrop"></div>
    </div>
`;
