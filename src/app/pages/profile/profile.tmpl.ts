export const tmpl = `
        <div class="profile">
            <div class="profile__avatar">
                <div class="profile__icon"></div>
                <div class="profile__avatar_hover">Change avatar</div>
            </div>
            <div class="profile__user-name">{{ userName }}</div>
            
            {{#if changePassword}}
            
            <div class="profile__user-data">
                <div class="profile__option-field">
                    <span class="profile__field-label">Email</span>
                    <input class="profile__field-input" type="email" value="{{ emailValue }}" {{#if nonAvailableChanges}}disabled{{/if}}>
                </div>
                <div class="profile__option-field">
                    <span class="profile__field-label">Login</span>
                    <input class="profile__field-input" type="text" value="{{ loginValue }}" {{#if nonAvailableChanges}}disabled{{/if}}>
                </div>
                <div class="profile__option-field">
                    <span class="profile__field-label">Name</span>
                    <input class="profile__field-input" type="text" value="{{ nameValue }}" {{#if nonAvailableChanges}}disabled{{/if}}>
                </div>
                <div class="profile__option-field">
                    <span class="profile__field-label">Last name</span>
                    <input class="profile__field-input" type="text" value="{{ lastNameValue }}" {{#if nonAvailableChanges}}disabled{{/if}}>
                </div>
                <div class="profile__option-field">
                    <span class="profile__field-label">Nickname</span>
                    <input class="profile__field-input" type="text" value="{{ nicknameValue }}" {{#if nonAvailableChanges}}disabled{{/if}}>
                </div>
                <div class="profile__option-field">
                    <span class="profile__field-label">Phone</span>
                    <input class="profile__field-input" type="text" value="{{ phoneValue }}" {{#if nonAvailableChanges}}disabled{{/if}}>
                </div>
            </div>
            
            {{#if nonAvailableChanges}}            
            <div>
                 <div class="profile__option-field">
                    <a id="link-change-data" class="profile__link-action">Change data</a>
                </div>
                <div class="profile__option-field">
                    <a id="link-change-pass" class="profile__link-action">Change password</a>
                </div>
                <div class="profile__option-field">
                    <a href="/auth" class="profile__link-action_logout">Logout</a>
                </div>         
            </div>
            {{else}}
            <div class="profile__save-button">
                {{>saveDataBtn}}
            </div>
            {{/if}}
            {{else}}
            <div class="profile__user-password">
                <div class="profile__option-field">
                    <span class="profile__field-label">Old password</span>
                    <input class="profile__field-input" type="password" value="{{ oldPasswordValue }}">
                </div>
                <div class="profile__option-field">
                    <span class="profile__field-label">New password</span>
                    <input class="profile__field-input" type="password" value="{{ newPasswordValue }}">
                </div>
                <div class="profile__option-field">
                    <span class="profile__field-label">Repeat new password</span>
                    <input class="profile__field-input" type="password" value="{{ copyNewPasswordValue }}">
                </div>
            </div>
            
            <div class="profile__save-button">
                {{>savePassBtn}}
            </div>
            {{/if}}
        </div>
`;
