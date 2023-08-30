import { io } from 'socket.io-client';

const socket = io('https://ict-forum-server.onrender.com/', { transports: ['websocket', 'polling', 'flashsocket'] });

export default socket;