export const modalTmpl = `
    <div class="modal-wrapper">
        <div class="modal">
            <div class="modal__message">
                {{#if target}}
                    {{ message }} <span class="modal__target">{{ target }}</span>?
                {{else}}
                    {{ message }}?
                {{/if}}
            </div>
            
            <div class="modal__buttons">
                {{{ confirm }}}
                {{{ cancel }}}
            </div>
        </div>
        <div class="modal-wrapper__backdrop"></div>
    </div>
`;
