export const signinTmpl = `
    <div class="signin-wrapper">
        <div class="signin">
            <div class="signin__logo"></div>
            <h1 class="signin__title">Sign in to Messenger</h1>
            <p class="signin__info">Please enter your login and password.</p>
        
            <form class="signin__form">
                {{{ loginInput }}}
                {{{ passwordInput }}}
                {{{ submitBtn }}}
            </form>
            
            {{{ linkBtn }}}
        </div>
        <p class="signin__signature">Developed by Sergey Chumak</p>
    </div>
`;
