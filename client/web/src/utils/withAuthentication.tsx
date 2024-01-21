import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthentication, getUser } from "@utils/helpers";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const withAuthentication = (WrappedComponent: React.FC) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (props: any) => {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(() => {
            if (!checkAuthentication()) {
                navigate("/unauthorized");
            } else {
              // Storing user in the store
                const user = getUser()
                if (user !== null) {
                    const parsedUser = JSON.parse(user);
                    const token = parsedUser.token;
                    dispatch(
                        setUser({
                            id: parsedUser.id,
                            email: parsedUser.email,
                            firstname: parsedUser.firstname,
                            lastname: parsedUser.lastname,
                            profile_pic: parsedUser.profile_pic,
                            token: token,
                        })
                    );
                }
            }
        }, [dispatch, navigate]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuthentication;
