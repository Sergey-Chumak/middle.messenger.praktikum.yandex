export const tmpl = `
    <div class="ui-input {{ class }}">
        <label class="ui-input__label" for="{{ name }}">{{ labelName }}</label>
        <input type="{{ type }}" 
               id="{{ name }}"
               autocomplete="{{ autocomplete }}"
               class="ui-input__input {{#if isError}}ui-input__input_error{{/if}}"/>
        {{#if isError}}
        <p class="ui-input__error">{{ errorMessage }}</p>
        {{/if}}
    </div>
`;
