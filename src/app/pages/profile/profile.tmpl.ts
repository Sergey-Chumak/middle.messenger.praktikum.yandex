export const tmpl = `
    <div class="profile-wrapper">
    {{{ changeAvatarModal }}}
        <div class="profile-wrapper__back-to-chats" id="back-to-chats-icon"></div>
        <div class="profile" id="profile">
            <div class="profile__avatar">
                {{#if avatar}}
                <img class="profile__avatar_img" src="https://ya-praktikum.tech/api/v2/Resources{{ avatar }}" alt="">
                {{/if}}
                <div class="profile__icon"></div>
                <div class="profile__avatar_hover" id="profile-avatar">Change avatar</div>
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
            
            <div class="profile__save-button">
                {{{ saveDataBtn }}}
            </div>
            
             <div class="profile__save-button">
                {{{ savePassBtn }}}
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
                    <a id="profile-logout" class="profile__link-action_logout">Logout</a>
                </div>
            </div>
            {{else}}
            <div class="profile__cancel-wrapper">
                <a id="cancel-link" class="profile__cancel-link">Cancel</a>
            </div>
            {{/if}}
        </div>
    </div>
`;
