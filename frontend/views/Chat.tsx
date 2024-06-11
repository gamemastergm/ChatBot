import '../index.css';
import { Button } from "@hilla/react-components/Button.js";
import { Notification } from "@hilla/react-components/Notification.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { HelloEndpoint } from "Frontend/generated/endpoints.js";
import { useEffect, useState } from "react";
import io from 'socket.io-client';

// Importe a definição de tipo do Socket.IO Client
import { Socket } from 'socket.io-client';

export default function MainView() {
    const [name, setName] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [socket, setSocket] = useState<Socket | null>(null); // Use o tipo Socket
    const [question, setQuestion] = useState<string | null>(null);
    const [alternatives, setAlternatives] = useState<string[]>([]);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);

    // Toda vez que rodar o ngrok colocar "ngrok tcp 8080" no terminal. Então coloque o link similar ao abaixo nesse código
    useEffect(() => {
        // Conectando ao servidor via ngrok
        const ngrokUrl = 'ws://0.tcp.sa.ngrok.io:16335'; // Substitua pelo URL fornecido pelo ngrok
        const newSocket = io(ngrokUrl);

        // Atualizando o estado do socket
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Conectado ao servidor');
            setIsConnected(true); // Atualiza o estado para refletir que está conectado.
        });

        newSocket.on('disconnect', () => {
            console.log('Desconectado do servidor');
            setIsConnected(false); // Atualiza o estado para refletir que a conexão foi perdida.
        });

        newSocket.on('message', (message: string) => {
            // Tratamento das mensagens recebidas
            setMessages(prevMessages => [...prevMessages, message]);
        });

        newSocket.on('question', (data: { pergunta: string, alternativas: string[] }) => {
            setQuestion(data.pergunta);
            setAlternatives(data.alternativas);
            setAnswer(null); // Reset the answer when a new question is received
        });

        newSocket.on('countdown', (count: number) => {
            setCountdown(count);
        });

        newSocket.on('answer', (correctAnswer: string) => {
            setAnswer(correctAnswer);
        });

        // Retornando uma função de limpeza
        return () => {
            newSocket.disconnect(); // Desconecta do servidor ao desmontar o componente
        };
    }, []); // Executa apenas uma vez na montagem do componente

    const sendMessage = () => {
        if (socket) {
            socket.emit('message', inputValue);
            setInputValue('');
        }
    };

    return (
        <>
            <nav className="nav justify-content-center">
                <a className="nav-link active" href="#" aria-current="page">Active link</a>
                <a className="nav-link" href="#">Link</a>
                <a className="nav-link disabled" href="#">Disabled link</a>
            </nav>

            <div>
                <h1>Chat em tempo real</h1>
                <div>
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Digite sua mensagem..."
                    />
                    <button onClick={sendMessage}>Enviar</button>
                </div>
            </div>
            <TextField
                label="Your name"
                onValueChanged={(e) => {
                    setName(e.detail.value);
                }}
            />
            <Button
                onClick={async () => {
                    const serverResponse = await HelloEndpoint.sayHello(name ?? "");
                    if (serverResponse !== undefined) {
                        Notification.show(serverResponse);
                    }
                }}
            >
                Say hello
            </Button>
            <div>
                {question && (
                    <div>
                        <h2>Pergunta:</h2>
                        <p>{question}</p>
                        <ul>
                            {alternatives.map((alt, index) => (
                                <li key={index}>{alt}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {countdown !== null && (
                    <div>
                        <p>Próxima pergunta em: {countdown} segundos</p>
                    </div>
                )}
                {answer && (
                    <div>
                        <p>{answer}</p>
                    </div>
                )}
            </div>
        </>
    );
}
