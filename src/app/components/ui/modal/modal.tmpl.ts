export const tmpl = `
    <div class="modal">
        <div>
            <div class="modal__header">{{ header }}</div>
            {{#if avatar}}
            <input id="file-download" type="file">
            {{else}}
            <div class="modal__message">{{ message }}</div>
            {{/if}}
            {{{input}}}
        </div>
        
        <div class="modal__buttons">
            {{{ confirm }}}
            {{{ cancel }}}
        </div>
    </div>
    <div class="backdrop"></div>
`;
