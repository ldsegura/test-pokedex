import { useEffect, useState } from "react";
import localstorageConstants from "../constants/localstorageConstants";
import authAction from "../actions/authAction";
import { useDispatch } from "../store/StoreProvider";

const useAuthVerification = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({loading: 1 });

    const noLogin = () => {
      setUser({loading: -1});
    }

    useEffect(() => {
        const logUserApp = window.localStorage.getItem(localstorageConstants.AUTH);

        if (logUserApp) {
          const user = JSON.parse(logUserApp);
          if (user) {
            authAction.loaded(user, dispatch);
            setUser({...user, loading: 0, login: true})
          }
          else noLogin();
        }
        else {
          noLogin();
        }
      }, [dispatch]);

      return user;
}
 
export default useAuthVerification;