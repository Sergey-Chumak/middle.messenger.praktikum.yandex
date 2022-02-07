export const buttonTmpl = `
    <button {{#if id}} id="{{ id }}" {{/if}}
            type="button"
            class="c-button__button">
        {{ name }}
    </button>
`;
