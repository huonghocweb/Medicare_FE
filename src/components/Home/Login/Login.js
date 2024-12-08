import React from 'react';

const Login = ({authRequestState, handleChangeAuthRequest , submitLogin}) => {
    return (
        <>
        <section className="sign-in-page">
            <div className="container bg-white mt-5 p-0">
                <div className="row no-gutters" style={{backgroundColor : '#f8f9fa'}}>
                    <div className="col-sm-6 align-self-center">
                        <div className="sign-in-from">
                            <h1 className="mb-0 dark-signin">Sign in</h1>
                            <p>Enter your email address and password to access admin panel.</p>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">User Name :  </label>
                                    <input
                                    value={authRequestState.userName}
                                     onChange={(e) => handleChangeAuthRequest('userName', e.target.value)}
                                     type="text" 
                                     className="form-control mb-0"  
                                     placeholder="Enter UserName"/>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password : </label>
                                    <a href="#" className="float-right">Forgot password?</a>
                                    <input 
                                     value={authRequestState.password}
                                    onChange={(e) => handleChangeAuthRequest('password', e.target.value)}
                                    type="password" 
                                    className="form-control mb-0"  
                                    placeholder="Password"/>
                                </div>
                                <div className="d-inline-block w-100">
                                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                        <input type="checkbox" 
                                         id="rememberMe"
                                        onChange={(e) => handleChangeAuthRequest('remember', e.target.checked)}
                                        className="custom-control-input" />
                                        <label className="custom-control-label" htmlFor='rememberMe' >Remember Me</label>
                                    </div>
                                    <button onClick={submitLogin} className="btn btn-primary float-right">Sign in</button>
                                </div>
                                <div className="sign-info">
                                    <span className="dark-color d-inline-block line-height-2">Don't have an account? <button className='btn btn-secondary'>Sign up</button></span>
                                    <ul className="iq-social-media">
                                        <li><button ><i className="fa-brands fa-facebook"></i></button></li>
                                        <li><button><i className="fa-brands fa-google"></i></button></li>
                                        <li><button><i className="fa-brands fa-github"></i></button></li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div className="col-sm-6 text-center">
                        <div className="sign-in-detail text-white">
                            <a className="sign-in-logo mb-5" href="#"><img src="images/logo-white.png" className="img-fluid" alt="logo"/></a>
                            <div className="slick-slider11">
                                <div className="item">
                                    <img src={`/assets/images/backgroundLogin.png`} className="img-fluid mb-4" alt="logo"/>
                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                {/* <div className="item">
                                    <img src="images/login/1.png" className="img-fluid mb-4" alt="logo"/>
                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                <div className="item">
                                    <img src="images/login/1.png" className="img-fluid mb-4" alt="logo"/>
                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        </>
    );
};

export default Login;