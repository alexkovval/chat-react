import { useEffect, useState } from 'react';
import styles from './Rooms.module.css';
import { useSelector } from 'react-redux';
import socket from '../../socket/socket';
import {Chat} from '../Chat/Chat';

export const Rooms = () => {
    const [messageList, setMessageList] = useState([]);
    const [connected, setConnected] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomId] = useState('');

    //GET USER FROM LOGIN

    const token = useSelector(state => state.User.token);

    const user = JSON.parse(localStorage.getItem('user'));
    let tokenStorage = localStorage.getItem('jwt');


    useEffect(() => {
        fetch('http://localhost:5000/rooms', {
            headers: {
                'x-access-token': token ? token : tokenStorage,
            },
        })
            .then((response) => response.json())
            .then((data) => setRooms(data));
    }, []);

    const openRoom = (roomId) => {
        socket.connect(); 
        setRoomId(roomId);
        socket.emit('join_room', roomId);
        setConnected(true);
        fetch('http://localhost:5000/messages/room', {
            method: 'POST',
            headers: {
                'x-access-token': token ? token : tokenStorage,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roomId: roomId,
            }),
        })
            .then((response) => response.json())
            .then((data) => setMessageList(data));
    };

    

    return (
        <div className={styles.window}>
            <h3>Rooms</h3>
            <div className={styles.rooms}>
                <div className={styles.room}>
                    <div>
                        {rooms.length &&
                            rooms.map((room) => (
                                <button
                                    key={room._id}
                                    onClick={() => {
                                        openRoom(room._id);
                                    }}
                                >
                                    {room.name}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
            {connected && (<Chat user={user} roomId={roomId} setMessageList={setMessageList} messageList={messageList} />)}
        </div>
    );
};
