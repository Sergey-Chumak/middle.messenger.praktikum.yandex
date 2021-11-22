export const tmpl = `
    <main class="main">
        <div class="main__page-wrapper" id="page-wrapper"></div>
        {{#if showMenu}}
        {{>sidebar }}
        <div id="icon-menu" class="main__icon-menu"></div>
        <div id="main-backdrop" class="main__backdrop"></div>
        {{/if}}
    </main>
`;
