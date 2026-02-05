import { useAppDispatch } from "../../../shared/store";
import { useAuthUserMutation } from "../services/authApi";
import { saveAuthInfo, setCurrentRole } from "../store/authSlice";

export const useLogin = () => {
  const [login, { isLoading, error, isSuccess, status, isError }] = useAuthUserMutation();

  const dispatch = useAppDispatch();

  const handleLogin = async (username: string, password: string) => {
    try {
      const result = await login({ username, password }).unwrap();
      dispatch(saveAuthInfo(result));
      dispatch(setCurrentRole({ role: result.roles[0] }));

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