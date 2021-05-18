import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../store";
import { startSignout } from "../store/user";

const useAuth = (): [boolean, () => void] => {
  const isAuthenticated = useSelector(
    (state: ApplicationState) => state.user.isAuthenticated
  );
  const fullName = useSelector(
    (state: ApplicationState) => state.user.fullName
  );
  const email = useSelector((state: ApplicationState) => state.user.email);

  const dispatch = useDispatch();

  let isAuth = true;
  if (!isAuthenticated || !email || !fullName) isAuth = false;

  const handleLogout = () => {
    dispatch(startSignout());
  };

  return [isAuth, handleLogout];
};

export default useAuth;
