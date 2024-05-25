import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        localStorage && localStorage.clear();
    }

    return logout;
}

export default useLogout;