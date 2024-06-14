import { UserEndpoint } from "Frontend/generated/endpoints.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import React, { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== passwordConfirm) {
            setError('As senhas não correspondem');
            return;
        }

        try {
            const response = await UserEndpoint.saveUser(username, password);
            console.log(response);

            if (response && response.statusCodeValue === 201) { // Status 201 Created
                toast.success('Usuário registrado com sucesso');
                navigate('/login'); // Redireciona para a página de login
            } else {
                toast.error(`Erro ao registrar usuário: ${response?.statusCode}`);
                setError(`Erro ao registrar usuário: ${response?.statusCode}`);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Erro desconhecido ao registrar usuário');
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
                                    <h2 className="fs-6 fw-normal text-center mb-4">REGISTRE-SE</h2>
                                    <form onSubmit={handleRegister}>
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
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control bg-dark text-white border-0"
                                                        name="passwordConfirm"
                                                        id="passwordConfirm"
                                                        placeholder="Confirm Password"
                                                        value={passwordConfirm}
                                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="passwordConfirm" className="form-label text-secondary">Confirm Password</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button className="btn btn-danger btn-lg" type="submit">Registre-se</button>
                                                </div>
                                            </div>
                                            {error && (
                                                <div className="col-12">
                                                    <div className="alert alert-danger mt-3">
                                                        {error}
                                                    </div>
                                                </div>
                                            )}
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
