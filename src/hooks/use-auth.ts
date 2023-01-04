import {selectUser} from "../redux/user/selectors";
import {useSelector} from "react-redux";

export function useAuth() {
    const{email, token, id} = useSelector(selectUser)
    return{
        isAuth: !!email,
        email,
        token,
        id,
    }
}