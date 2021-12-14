export const tmpl = `
    <main class="main" id="main">
        {{{ page }}}
        {{{ sidebar }}}
        {{#if isMenu}}
        <div id="icon-menu" class="main__icon-menu"></div>
        <div class="main__backdrop"></div>
        {{/if}}
    </main>
`;
