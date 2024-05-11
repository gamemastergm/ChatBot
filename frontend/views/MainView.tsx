import { useState, useEffect } from "react";
import { Button } from "@hilla/react-components/Button.js";
import { Notification } from "@hilla/react-components/Notification.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { HelloEndpoint } from "Frontend/generated/endpoints.js";
import io from 'socket.io-client';

export default function MainView() {
    const [name, setName] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const socket = io('ws://localhost:8090'); // Substitua localhost pelo endereço do seu servidor

    // Função para enviar mensagens
    const sendMessage = () => {
        socket.emit('message', inputValue);
        setInputValue('');
    };

    useEffect(() => {
        // Função para lidar com mensagens recebidas do servidor
        const handleNewMessage = (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        };

        // Ouça por mensagens do servidor
        socket.on('message', handleNewMessage);

        // Limpeza
        return () => {
            socket.off('message', handleNewMessage);
        };
    }, []);

    useEffect(() => {
        // Função para conectar-se ao servidor
        function connectToServer() {
            if (!isConnected) {
                socket.on('connect', () => {
                    console.log('Conectado ao servidor');
                    setIsConnected(true); // Atualiza o estado para refletir que está conectado.
                });

                socket.on('disconnect', () => {
                    console.log('Desconectado do servidor');
                    setIsConnected(false); // Atualiza o estado para refletir que a conexão foi perdida.
                });

                // Você pode adicionar mais ouvintes aqui, como para mensagens recebidas, etc.
            } else {
                console.log('Já conectado ao servidor, não reconectar.');
            }
        }

        connectToServer(); // Chamada inicial para conectar-se ao servidor

    }, [isConnected]);

    return (
        <>
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
                    const serverResponse = await HelloEndpoint.sayHello(name || "");
                    if (serverResponse !== undefined) {
                        Notification.show(serverResponse);
                    }
                }}
            >
                Say hello
            </Button>
        </>
    );
}
