export const tmpl = `
    <div class="signin-wrapper">
        {{{ snackbar }}}
        <div class="signin">
            <form id="sign-in-form">
                {{{ loginInput }}}
                {{{ passwordInput }}}
                <div class="signin__submit-btn">
                    {{{ submitBtn }}}
                </div>
            </form>
            <a id="create-account-link" 
               class="signin__link">
               Create account
            </a>
        </div>
    </div>
`;
