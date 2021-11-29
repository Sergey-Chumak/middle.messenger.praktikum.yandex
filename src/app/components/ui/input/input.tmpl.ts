export const tmpl = `
    <div class="ui-input {{ class }} ui-input__{{from}}">
        <label class="ui-input__label" for="{{ id }}">{{ labelName }}</label>
        <input type="{{ type }}" 
               id="{{ id }}"
               autocomplete="{{ autocomplete }}"
               value="{{ value }}"
               placeholder="{{ placeholder }}"
               class="ui-input__input ui-input__input_error"
               {{#if autofocus}}autofocus="true"{{/if}}
               {{#if disabled}}disabled{{/if}}/>
        <p class="ui-input__error">{{ errorMessage }}</p>
    </div>
`;
