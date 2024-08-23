import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/loginApi';
import './Login.css'; // Ensure this CSS file contains the provided styles
import waveImg from '../../assets/wave.png';
import bgImg from '../../assets/bg.svg';
import avatarImg from '../../assets/avatar.svg';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // State for loading
    const [snackbarMessage, setSnackbarMessage] = useState<string>(''); // State for Snackbar message
    const [snackbarStyle, setSnackbarStyle] = useState<React.CSSProperties>({}); // State for Snackbar style
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);

    const [state, setState] = React.useState<{
        open: boolean;
        Transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >;
    }>({
        open: false,
        Transition: SlideTransition,
    });

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setLoading(true);

        try {
            await login(username, password);
            localStorage.setItem('username', username);
            setTimeout(() => {
                setSnackbarMessage('Login successful!');
                setSnackbarStyle({ backgroundColor: 'green' });
                setState({
                    open: true,
                    Transition: SlideTransition,
                });
                setTimeout(() => {
                    setLoading(false);
                    navigate('/dashboard', { state: username });
                }, 1500);
            }, 1000);
        } catch (error) {
            // Handle login error
            setSnackbarMessage('Invalid username or password');
            setSnackbarStyle({ backgroundColor: 'red' });
            setState({
                open: true,
                Transition: SlideTransition,
            });
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        } finally { setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    };




    useEffect(() => {
        if (usernameRef.current) {
            setTimeout(() => {
                usernameRef.current?.focus();
            }, 0);
        }
    }, []);

    useEffect(() => {
        const inputs = document.querySelectorAll<HTMLInputElement>(".input");

        const addcl = function (this: HTMLInputElement) {
            const parent = this.parentNode?.parentNode as HTMLElement;
            if (parent) {
                parent.classList.add("focus");
            }
        };

        const remcl = function (this: HTMLInputElement) {
            const parent = this.parentNode?.parentNode as HTMLElement;
            if (parent && this.value === "") {
                parent.classList.remove("focus");
            }
        };

        inputs.forEach((input) => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });

        return () => {
            inputs.forEach((input) => {
                input.removeEventListener("focus", addcl);
                input.removeEventListener("blur", remcl);
            });
        };
    }, []);

    const handleClose = () => {
        setState(prevState => ({ ...prevState, open: false }));
    };

    return (
        <div className="login-page">
            <img className="wave" src={waveImg} alt="wave" />
            <div className="container">
                <div className="img">
                    <img src={bgImg} alt="background" />
                </div>
                <div className="login-content">
                    <form onSubmit={handleLogin} autoComplete="on">
                        <img src={avatarImg} alt="avatar" />
                        <h2 className="title">Welcome</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                <h5>Username</h5>
                                <input
                                    type="text"
                                    className="input"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    ref={usernameRef}
                                    autoComplete="username"
                                />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <h5>Password</h5>
                                <input
                                    type="password"
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>
                        <a href="#">Forgot Password?</a>
                        <LoadingButton
                            type="submit"
                            size="small"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            sx={{ width: '150px', height: '50px', marginTop: "40px" }}
                            className='btn'
                        >
                            <span>Login</span>
                        </LoadingButton>
                        <Snackbar
                            open={state.open}
                            onClose={handleClose}
                            TransitionComponent={state.Transition}
                            message={snackbarMessage}
                            key={state.Transition.name}
                            autoHideDuration={1500} // Snackbar duration
                            ContentProps={{
                                style: { ...snackbarStyle, textAlign: 'center' }, // Apply dynamic styles
                            }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
