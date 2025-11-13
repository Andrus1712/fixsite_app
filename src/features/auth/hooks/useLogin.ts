import { useAppDispatch } from "../../../shared/store";
import { useAuthUserMutation } from "../services/authApi";
import { saveAuthInfo, setCurrentRole, setCurrentToken } from "../store/authSlice";

export const useLogin = () => {
  const [login, { isLoading, error, isSuccess, status, isError }] = useAuthUserMutation();

  const dispatch = useAppDispatch();

  const handleLogin = async (username: string, password: string) => {
    try {
      const result = await login({ username, password }).unwrap();
      dispatch(saveAuthInfo({
        _token: result._token,
        user: result.user,
        roles: result.roles,
        permission: result.permission,
        modules: result.modules,
        tenants: result.tenants
      }));
      dispatch(setCurrentRole({ role: result.roles[0] }));
      dispatch(setCurrentToken(result._token));

      alert("Login succefully");
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    handleLogin,
    isLoading,
    error,
    isSuccess,
    isError,
    status
  };
};