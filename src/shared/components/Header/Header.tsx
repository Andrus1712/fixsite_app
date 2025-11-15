import { FaBars, FaUser } from "react-icons/fa";
import { useTheme } from "styled-components";
import {
    BurgerButton,
    HeaderContent,
    ItemUser,
    OptionsContainer,
} from "./HeaderStyles";
import RolesSelector from "../RolesSelector";
import PageTitle from "../PageTitle";
import { Row } from "../Layouts";

interface TopHeaderProps {
    onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: TopHeaderProps) {
    const theme = useTheme();
    return (
        <HeaderContent>
            <Row $gap={"xl"}>
                <Row $align="center" $justify="center" $gap={"xs"}>
                    <BurgerButton onClick={onToggleSidebar}>
                        <FaBars />
                    </BurgerButton>
                    <PageTitle />
                </Row>
            </Row>
            <OptionsContainer>
                <RolesSelector />
                <ItemUser>
                    <FaUser color={theme.colors.white} />
                </ItemUser>
            </OptionsContainer>
        </HeaderContent>
    );
}

export default Header;
