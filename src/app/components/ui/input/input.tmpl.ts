export const tmpl = `
    <div class="ui-input {{ class }}">
        <label class="ui-input__label" for="{{ id }}">{{ labelName }}</label>
        <input type="{{ type }}" 
               id="{{ id }}"
               autocomplete="{{ autocomplete }}"
               value="{{ value }}"
               class="ui-input__input {{#if isError}}ui-input__input_error{{/if}}"
               {{#if disabled}}disabled{{/if}}/>
        {{#if isError}}
        <p class="ui-input__error">{{ errorMessage }}</p>
        {{/if}}
    </div>
`;
