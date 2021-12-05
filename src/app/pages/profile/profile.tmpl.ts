export const tmpl = `
    <div class="profile">
        <div class="profile__avatar">
            <div class="profile__icon"></div>
            <div class="profile__avatar_hover">Change avatar</div>
        </div>
        <div class="profile__user-name">{{ userName }}</div>
            
        <div class="profile__user-data">
            {{{ emailInput }}}
            {{{ loginInput }}}
            {{{ nameInput }}}
            {{{ lastNameInput }}}
            {{{ nicknameInput }}}
            {{{ phoneInput }}}
            
            {{{ oldPasswordInput }}}
            {{{ newPasswordInput }}}
            {{{ newPasswordRepeatInput }}}
        </div>
        
        {{#if nonAvailableChangeData}}
        <div class="profile__actions">
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
        {{/if}}
        
         <div class="profile__save-button">
            {{{ saveDataBtn }}}
        </div>
        
         <div class="profile__save-button">
            {{{ savePassBtn }}}
        </div>
    </div>
`;
