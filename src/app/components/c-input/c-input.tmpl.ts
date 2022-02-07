export const inputTmpl = `
    <input type="{{ type }}" 
           id="{{ id }}"
           autocomplete="off"
           value="{{ value }}"
           class="c-input__input"
           required
           />
    <label class="c-input__message c-input__label" for="{{ id }}">{{ labelName }}</label>
    <span class="c-input__message c-input__error">{{ errorMessage }}</span>
`;
