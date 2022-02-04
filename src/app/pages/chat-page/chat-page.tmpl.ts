export const chatPageTmpl = `
    <div id="chat-page" class="chat-page chat-list-hide">
        {{{ chatList }}}
        <div id="chat-page-content" class="chat-page__content">
            {{{ chat }}}
            {{{ plug }}}
        </div>
        
       {{{ newChatModal }}}
       {{{ editUserModal }}}
       {{{ changeAvatarModal }}}
       {{{ userInfoModal }}}
       {{{ modal }}}
    </div>
`;
