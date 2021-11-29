export const tmpl = `
    <div class="dialog">
        <div class="dialog__header">
            <div class="dialog__user">
                <div class="dialog__avatar"></div>
                <div class="dialog__name">{{ name }}</div>
            </div>
            <div class="dialog__context-menu"></div>
        </div>
        <div class="dialog__message">{{{ messages }}}</div>
        <div class="dialog__footer">
            <div class="dialog__file"></div>
            <input value="{{ value }}" id="input-message" placeholder="Message" class="dialog__message-input"/>
            <div id="send-message-btn" class="dialog__send-message-btn"></div>
        </div>
    </div>
`;
