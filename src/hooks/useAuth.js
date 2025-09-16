import { useSelector } from "react-redux";

export default function useAuth() {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  return { isAuthenticated: !!token, user, token };
}
