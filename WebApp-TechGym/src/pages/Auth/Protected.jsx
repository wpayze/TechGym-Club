import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAppContext();
    
    if (!isLoggedIn)
        navigate("/login")

    return children;
}

export default Protected;