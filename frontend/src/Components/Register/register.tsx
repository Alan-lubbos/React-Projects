import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../State/store';
import { setError, setLoading, setPassword, setUsername } from '../../State/reducers/registerSlice';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username, password, loading, error } = useSelector((state: RootState) => state.register);

    const handleRegister = async () => {
        if (!username || !password) {
            dispatch(setError('Username and Password are required.'));
            return;
        }

        dispatch(setLoading(true));
        try {
            const response = await axios.post('http://localhost:5000/register', { username, password });
            console.log(response.data);
            // Redirect to the login page after successful registration
            navigate('/login');
        } catch (err: any) {
            dispatch(setError(err.response?.data?.message || 'Registration failed.'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-header">Register to Flex-Gym</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="form-container">
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => dispatch(setUsername(e.target.value))}
                    className="input-field"
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    className="input-field"
                />
                <button onClick={handleRegister} disabled={loading} className="submit-button">
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </div>
        </div>
    );
};

export default Register;
