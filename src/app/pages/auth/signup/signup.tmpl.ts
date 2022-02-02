export const signUpTmpl = `
    <div class="signup__wrapper">
        <div class="signup" id="signup">
            <h1 class="signup__title">Sign up to Messenger</h1>
            <p class="signup__info">Please fill out the registration form.</p>        
        
            <form class="signup__form">
                {{{ emailInput }}}
                {{{ loginInput }}}
                {{{ nameInput }}}
                {{{ lastNameInput }}}
                {{{ phoneInput }}}
                {{{ passwordInput }}}
                {{{ passwordRepeatInput }}}
                {{{ submitBtn }}}
            </form>
            
            {{{ linkBtn }}}
        </div>
    </div>
`;
