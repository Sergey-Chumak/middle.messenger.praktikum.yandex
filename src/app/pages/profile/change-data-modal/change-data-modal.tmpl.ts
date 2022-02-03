export const changeDataModalTmpl = `
    <div class="change-data-modal-wrapper">
        <div class="change-data-modal">
            <div id="change-data-modal-close" class="change-data-modal__close-modal-icon"></div>
            
            <div class="change-data-modal__header">Change data</div>
            
            <form class="change-data-modal__form">
                {{{ emailInput }}}
                {{{ loginInput }}}
                {{{ firstNameInput }}}
                {{{ secondNameInput }}}
                {{{ displayNameInput }}}
                {{{ phoneInput }}}
                
                {{{ submitBtn }}}
            </form>
            
            {{{ linkBtn }}}
        </div>
        <div class="change-data-modal-wrapper__backdrop"></div>
    </div>
`;
