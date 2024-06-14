import '../index.css';
import { TextField } from "@hilla/react-components/TextField.js";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';

export default function Chat() {
    const [name, setName] = useState((sessionStorage.getItem('username') || "").toUpperCase());
    const [contagem, setContagem] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<[string, string][]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [question, setQuestion] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [ranking, setRanking] = useState<[string, string][]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ngrokUrl = 'ws://0.tcp.sa.ngrok.io:12659'; // Substitua pelo URL fornecido pelo ngrok
        const newSocket = io(ngrokUrl);

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Conectado ao servidor');
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Desconectado do servidor');
            setIsConnected(false);
        });

        newSocket.on('message', ({ nome, message }: { nome: string; message: string }) => {
            console.log('Nova mensagem recebida:', message);
            setMessages(prevMessages => {
                const updatedMessages: [string, string][] = [...prevMessages, [nome, message]];
                console.log('Mensagens atualizadas:', updatedMessages);
                return updatedMessages;
            });
        });

        newSocket.on('ranking', (data: [string, string][]) => {
            console.log('Ranking atualizado:', data);
            setRanking(data);
        });

        newSocket.on('question', (data: { pergunta: string, alternativas: string[] }) => {
            setMessages(prevMessages => [...prevMessages, ['BOT', data.pergunta]]);
            setQuestion(data.pergunta);
        });

        newSocket.on('countdown', (count: number) => {
            setCountdown(count);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = () => {
        if (socket && inputValue.trim()) {
            socket.emit('message', { nome: name, message: inputValue });
            setInputValue('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <style>{`
                body {
                    background: linear-gradient(to bottom, #0C000A, #1A0116);
                    color: white;
                }

                .chat-box {
                    background: transparent;
                    height: 85vh;
                    overflow-y: auto;
                }

                .chat-message {
                    margin-bottom: 10px;
                }

                .chat-message.user .message {
                    background-color: #EE1542;
                    color: white;
                    border-radius: 15px 15px 0 15px;
                }

                .chat-message.BOT .message {
                    background-color: #3E0515;
                    color: white;
                    border-radius: 15px 15px 15px 0;
                }

                .chat-message.otherUser .message {
                    background-color: #FFFFFF;
                    color: black;
                    border-radius: 15px 15px 15px 0;
                }

                .message {
                    padding: 10px;
                }

                .card {
                    background: transparent;
                    border: none;
                }
                
                .card-body {
                    width: 100%;
                    padding: 0;
                }

                .card-footer {
                    background: transparent;
                }

                .message-input {
                    width: 100%;
                }

                .navbar {
                    background-color: #350E2B;
                    color: white;
                }

                .card-header.bg-danger {
                    background-color: #dc3545 !important;
                    color: white;
                }

                .list-group-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .badge-primary {
                    background-color: #007bff;
                }

                .badge-pill {
                    border-radius: 50px;
                }

                .input-group {
                    border-radius: 30px;
                    overflow: hidden;
                }

                .input-group input {
                    border: none;
                    border-radius: 30px 0 0 30px;
                    box-shadow: none;
                }

                .input-group-append .btn {
                    background-color: #ff0054;
                    border: none;
                    border-radius: 0 30px 30px 0;
                    color: white;
                }

                .input-group-append .btn:hover {
                    background-color: #ff3366;
                }

                .chat-container {
                    display: flex;
                    justify-content: space-between;
                    width: 90%;
                    margin: 0 auto;
                }

                .chat-main {
                    flex: 0 0 70%;
                }

                .chat-sidebar {
                    flex: 0 0 15%;
                }
            `}</style>
            <nav className="navbar navbar-dark">
                <a className="navbar-brand" href="#">ChatGame</a>
                <div>{name}</div>
                <span className="navbar-text"></span>
            </nav>

            <div className="container mt-3 chat-container">
                <div className="chat-sidebar">
                    <div className="card">
                        <div className="card-header bg-danger text-white">
                            Tempo
                        </div>
                        <div className="card-body">
                            <p style={{color:"white"}}><strong>Tempo restante:</strong> {countdown} segundos</p>
                        </div>
                    </div>
                </div>
                <div className="chat-main">
                    <div className="card">
                        <div className="card-body chat-box" id="chat-box">
                            {messages.map(([messageName, messageContent], index) => (
                                <div key={index} className={`chat-message ${messageName === name ? 'user' : messageName === 'BOT' ? 'BOT' : 'otherUser'}`}>
                                    <div className="message">
                                        <strong>{messageName}: </strong> {messageContent}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="card-footer">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Digite sua mensagem..."
                                />
                                <div className="input-group-append">
                                    <button className="btn" onClick={sendMessage}>
                                        <SendIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-sidebar">
                    <div className="card">
                        <div className="card-header bg-danger text-white">
                            Ranking
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {ranking.map(([rankName, rankPoints], index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {rankName}
                                        <span className="badge badge-primary badge-pill">{rankPoints} pontos</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}