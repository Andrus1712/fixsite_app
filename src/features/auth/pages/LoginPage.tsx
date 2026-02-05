import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/useLogin";
import { useAppDispatch, useAppSelector } from "../../../shared/store";
import { useGetPermissionsByRoleQuery } from "../../permissions/services/permissionApi";
import {
    updateModules,
    updatePermissions,
    updateRoles,
    updateTenants,
} from "../store/authSlice";

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #0066ff;
    }
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 12px;
    background-color: #0066ff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0052cc;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`;

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { handleLogin, isLoading, error } = useLogin();
    const { data, isAuthenticated } = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await handleLogin(email, password);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/app");
        }
    }, [isAuthenticated]);

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Input
                    type="text"
                    placeholder="Usuario"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Entrar"}
                </Button>
                {error && (
                    <ErrorMessage>
                        {JSON.stringify(error, null, 2)}
                    </ErrorMessage>
                )}
            </LoginForm>
        </LoginContainer>
    );
};

export default LoginPage;
