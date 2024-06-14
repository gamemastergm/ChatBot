import { UserEndpoint } from "Frontend/generated/endpoints.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import React, { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await UserEndpoint.getAuthenticatedUser(username, password);
            console.log(response);

            if (response?.statusCodeValue === 200) { // Status 200 OK
                sessionStorage.setItem('username', username);
                toast.success('Login bem-sucedido');
                navigate('/chat'); // Redireciona para a página de chat
            } else if (response?.statusCodeValue === 401) { // Status 401 UNAUTHORIZED
                toast.error('Usuário ou senha incorretos');
                setError('Usuário ou senha incorretos');
            } else {
                throw new Error('Erro ao autenticar usuário');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError('Falha na autenticação. Por favor, tente novamente.');
            } else {
                setError('Erro desconhecido ao autenticar usuário');
            }
        }
    };

    return (
        <>
            <section className="text-white py-3 py-md-5" style={{ height: '100vh', background: "linear-gradient(to top, #0C010A, #000000)" }}>
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card bg-dark text-white border-0 rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <h2 className="fs-6 fw-normal text-center mb-4">LOGIN</h2>
                                    <form onSubmit={handleLogin}>
                                        <div className="row gy-2 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control bg-dark text-white border-0"
                                                        name="username"
                                                        id="username"
                                                        placeholder="Username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="username" className="form-label text-secondary">Username</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control bg-dark text-white border-0"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="password" className="form-label text-secondary">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button className="btn btn-danger btn-lg" type="submit">Login</button>
                                                </div>
                                            </div>
                                            {error && (
                                                <div className="col-12">
                                                    <div className="alert alert-danger mt-3">
                                                        {error}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="col-12 text-center mt-3">
                                                <p className="m-0 text-secondary">Não tem uma conta? <a href="/register" className="link-danger text-decoration-none">Registre-se</a></p>
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
