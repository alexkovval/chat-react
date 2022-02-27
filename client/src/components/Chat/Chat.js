import { useEffect, useState } from 'react';
import styles from './Chat.module.css';
import socket from '../../socket/socket';
import ScrollToBottom from 'react-scroll-to-bottom';

export const Chat = ({ user, roomId, messageList, setMessageList }) => {
    const [value, setValue] = useState('');
    const [userRead, setUserRead] = useState(false);

    useEffect(() => {
        socket.on('receive_message', (message) => {
            setMessageList((list) => [...list, message]);
        });
        // socket.on('user_read', () => {
        //     console.log('VV');
        //     setUserRead(true);
        // });
        return () => socket.disconnect();
    }, [socket]);

    const sendMessage = async (e) => {
        console.log(user.username);
        e.preventDefault();
        const NewMessage = {
            username: user.username,
            message: value,
            roomId,
        };
        await socket.emit('newMessage', NewMessage);
        NewMessage._id = Date.now();
        setValue('');
    };

    return (
        <div className={styles.chat}>
            <div className={styles.createMessage}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button className={styles.msgButton} onClick={sendMessage}>
                    Send
                </button>
            </div>
            <ScrollToBottom className={styles.messages}>
                {messageList.map((message) => (
                    <div className={styles.one-message} key={message._id}>
                        {message.username}: {message.message} 
                        {userRead && <i className="material-icons">done</i> }
                    </div>
                ))}
            </ScrollToBottom>
        </div>
    );
};
