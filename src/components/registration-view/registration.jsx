import React, {useState} from 'react';

export function registerView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.prevent();
        console.log(username, password, email, birthday);

    }
}

export default registerView;

