import OButton from "@/components/OButton";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    return (
        <>
            <OButton
                color="green"
                title="Go login"
                border="none"
                onClick={() => navigate("/login")}
            />
        </>
    );
}