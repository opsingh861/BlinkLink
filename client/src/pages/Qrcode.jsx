import EmptyComponent from "@/components/EmptyComponent";
import { useNavigate } from "react-router-dom";

const Links = () => {
    const navigation = useNavigate();

    return (
        <EmptyComponent
            header="Connect your audience with a simple scan"
            description="
            Create a QR Code from any short link. Then edit, customize, and track your QR Codes here."
            image="src/assets/qrc-list-empty.png"
            button={{
                label: "Create a QR Code",
                onClick: () => {
                    navigation("create");
                },
            }}
            scta={{ label: "Learn more" }}
        />
    );
};

export default Links;
