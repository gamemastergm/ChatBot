import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export default function Login() {
    return (
        <>
            <section className="text-white py-3 py-md-5" style={{ height: '100vh',  background: "linear-gradient(to top, #0C010A, #000000)", }}>
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card bg-dark text-white border-0 rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <h2 className="fs-6 fw-normal text-center mb-4">LOGIN</h2>
                                    <form action="#!">
                                        <div className="row gy-2 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control bg-dark text-white border-0" name="user" id="user"
                                                           placeholder="User" required/>
                                                    <label htmlFor="user" className="form-label text-secondary">User</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="password" className="form-control bg-dark text-white border-0" name="password"
                                                           id="password" value="" placeholder="Password" required/>
                                                    <label htmlFor="password" className="form-label text-secondary">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button className="btn btn-danger btn-lg" type="submit">Login
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center mt-3">
                                                <p className="m-0 text-secondary">Não tem uma conta? <a
                                                    href="#!" className="link-danger text-decoration-none">Registre-se</a>
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}