export const changePasswordModalTmpl = `
    <div class="change-password-modal-wrapper">
        <div class="change-password-modal">
            <div id="change-password-modal-close" class="change-password-modal__close-modal-icon"></div>
            
            <div class="change-password-modal__header">Change password</div>
            
             <form class="change-password-modal__form">
                {{{ oldPasswordInput }}}
                {{{ passwordInput }}}
                {{{ passwordRepeatInput }}}
                
                {{{ submitBtn }}}
            </form>
            
            {{{ linkBtn }}}
        </div>
        <div class="change-password-modal-wrapper__backdrop"></div>
    </div>
`;
