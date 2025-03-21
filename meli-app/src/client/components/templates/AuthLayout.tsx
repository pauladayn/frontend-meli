const AuthLayout = () => (
    <div className='container'>
        <div className='row card auth-layout'>
            <div className='col-12'>
                <div className='center auth-layout__content'>
                    <p>No estás logueado</p>
                    <a href='/login' className='main-btn'>
                        Ingresar
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default AuthLayout;
