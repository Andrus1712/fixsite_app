import { FaBars, FaUser } from "react-icons/fa";
import { useTheme } from "styled-components";
import { HeaderContent, ItemUser, OptionsContainer } from "./HeaderStyles";
import RolesSelector from "../RolesSelector";
import { Row } from "../Layouts";
import { Button, IconButton } from "../Buttons";
import { LuCalendarCog } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useHasPermission } from "../../../features/auth/hooks/useHasPermission";

interface TopHeaderProps {
    onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: TopHeaderProps) {
    const theme = useTheme();
    const navigator = useNavigate();
    const { hasPermission } = useHasPermission();
    return (
        <HeaderContent>
            <Row $gap={"xl"}>
                <Row $align="center" $justify="center" $gap={"md"}>
                    {hasPermission("order-new") ? (
                        <Button
                            leftIcon={<LuCalendarCog />}
                            type="button"
                            variant="pink"
                            onClick={() => navigator("/app/order/new")}
                        >
                            Nueva Reparación
                        </Button>
                    ) : null}
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
