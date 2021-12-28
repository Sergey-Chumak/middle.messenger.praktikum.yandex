export const tmpl = `
    <div id="sidebar" class="sidebar">
        <div class="sidebar__user-data">
            <div class="sidebar__user-data_avatar"></div>
            <div>
                <p class="sidebar__user-data_name">{{ userName }}</p>
                <p class="sidebar__user-data_phone">{{ userPhone }}</p>
            </div>
        </div>
        <nav class="sidebar__action-list">
            <div class="sidebar__actions">
                <div id="new-chat-sidebar" class="sidebar__action">
                    <div class="sidebar__icon sidebar__icon_new-chat"></div>
                    <span class="sidebar__action-name">Create a chat</span>
                </div>
                <div id="chat-list-sidebar" class="sidebar__action">
                    <div class="sidebar__icon sidebar__icon_chat-list"></div>
                    <span class="sidebar__action-name">Сhat list</span>
                </div>
                <div id="profile-sidebar" class="sidebar__action">
                    <div class="sidebar__icon sidebar__icon_setting"></div>
                    <span class="sidebar__action-name">Profile settings</span>
                </div>
            </div>
            
            <div id="logout-sidebar" class="sidebar__action">
                <div class="sidebar__icon sidebar__icon_logout"></div>
                <span class="sidebar__action-name">Logout</span>
            </div>
        </nav>
    </div>
    <div id="sidebar-backdrop" class="sidebar__backdrop"></div>
    <div id="sidebar-icon-menu" class="sidebar__icon-menu"></div>
`;
