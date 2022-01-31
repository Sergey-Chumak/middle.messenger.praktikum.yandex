export const tmpl = `
    <input type="{{ type }}" 
           id="{{ id }}"
           autocomplete="off"
           value="{{ value }}"
           {{#if autofocus}}autofocus="true"{{/if}}
           {{#if disabled}}disabled{{/if}}
           class="c-input__input {{ class }}"
           required
           />
    <label class="c-input__message c-input__label" for="{{ id }}">{{ labelName }}</label>
    <span class="c-input__message c-input__error">{{ errorMessage }}</span>
`;
