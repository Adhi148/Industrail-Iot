import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/loginApi';
import "./Login.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ }) => ({
    width: '90%',
    '& .MuiInputLabel-root': {
        color: 'white',
        fontSize: '14px',
        '&.Mui-focused': {
            color: 'rgba(255, 255, 255, 0.7)',
        }
    },
    '& .MuiInputBase-root': {
        color: 'white',
    },
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiInputBase-input::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    '& .MuiInput-underline:before': {
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)', // Color of the underline before focus
    },
    '& .MuiInput-underline:after': {
        borderBottom: '2px solid white', // Color of the underline after focus
    },
    '& .MuiInput-underline:hover:before': {
        borderBottom: '1px solid rgba(255, 255, 255, 0.5)', // Color of the underline on hover
    },
}));

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement | null>(null);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login(username, password);
            alert('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed');
        }
    };

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, []);

    return (
        <div className="login-page">
            <form onSubmit={handleLogin} className="form-login">
                <h1>SIGN IN</h1>
                <div className="login">
                    <CustomTextField
                        id="username"
                        label="USERNAME"
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='input-field'
                        inputRef={usernameRef}
                        autoComplete="username"
                    />
                </div>
                <div className="login">
                    <CustomTextField
                        id="password"
                        label="PASSWORD"
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input-field'
                        autoComplete="current-password"
                    />
                </div>
                <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "60px" }}>
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;
