import { useSelector, useDispatch } from "react-redux";
import {setUser} from '@/features/slice/userSlice'

export const useUser = () => {

    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user.user);

    const setCurrentUser = (user: any) => {
        dispatch(setUser(user))
    }

    return {
        user,
        setCurrentUser
    }
}