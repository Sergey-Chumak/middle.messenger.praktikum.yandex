export const avatarModalTmpl = `
    <div class="c-avatar-modal-wrapper"> 
        <div class="c-avatar-modal">
            <div class="c-avatar-modal__header">Change avatar</div>
            
            <input id="{{ inputId }}" class="c-avatar-modal__input" type="file">
            
            <div class="c-avatar-modal__buttons">
                {{{ confirmBtn }}}
                {{{ cancelBtn }}}
            </div>
        </div>
        <div class="c-avatar-modal-wrapper__backdrop"></div>
    </div>
`;
