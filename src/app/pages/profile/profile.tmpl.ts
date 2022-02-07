export const tmpl = `
    <div class="profile-wrapper">
        {{{ changeAvatarModal }}}
        {{{ changeDataModal }}}
        {{{ changePasswordModal }}}
        <div class="profile-wrapper__back-to-chats" id="back-to-chats-icon"></div>
        
        {{#with userData}}
        <div class="profile" id="profile">
            <div class="profile__avatar">
                {{#if avatar}}
                <img class="profile__avatar_img" src="https://ya-praktikum.tech/api/v2/Resources{{ avatar }}" alt="">
                {{/if}}
                <div class="profile__avatar-icon"></div>
                <div class="profile__avatar_hover" id="profile-avatar">Change avatar</div>
            </div>
            
            {{#if display_name}}
            <div class="profile__user-name">{{ display_name }}</div>
            {{ else }}
            <div class="profile__user-name">{{ first_name }} {{ second_name }}</div>
            {{/if}}
            
            <div class="profile__user-info">
                <div>
                    <span class="profile__label">Email</span>
                    {{ email }}
                </div> 
                <div>
                    <span class="profile__label">Login</span>
                    {{ login }}
                </div> 
                <div>
                    <span class="profile__label">First name</span>
                    {{ first_name }}
                </div> 
                <div>
                    <span class="profile__label">Second name</span>
                    {{ second_name }}
                </div> 
                <div>
                    <span class="profile__label">Display name</span>
                    {{ display_name }}
                </div> 
                <div>
                    <span class="profile__label">Phone</span>
                    {{ phone }}
                </div> 
            </div>
            
            <div class="profile__actions">
                <div class="profile__option-field">
                    <span id="link-change-data" class="profile__link-action">Change data</span>
                </div>
                <div class="profile__option-field">
                    <span id="link-change-pass" class="profile__link-action">Change password</span>
                </div>
                <div class="profile__option-field">
                    <span id="profile-logout" class="profile__link-action profile__link-action_logout">Logout</span>
                </div>
            </div>
        </div>
        {{/with}}
    </div>
`;
