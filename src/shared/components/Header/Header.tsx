import { FaUser } from "react-icons/fa";
import { useTheme } from "styled-components";
import { HeaderContent, ItemUser, OptionsContainer, UserDropdown, UserMenuHeader, UserInfo, UserAvatar, UserName, UserEmail, MenuDivider, LogoutItem, HeaderBrand } from "./HeaderStyles";
import RolesSelector from "../RolesSelector";
import { Row } from "../Layouts";
import { LuCalendarCog, LuLogOut } from "react-icons/lu";
import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import { logout } from "../../../features/auth/store/authSlice";
import { useNavigate } from "react-router";
import { useHasPermission } from "../../../features/auth/hooks/useHasPermission";
import Button from "../Buttons/Button";
import IconButton from "../Buttons/IconButton";
import { GrConfigure } from "react-icons/gr";
import { Text } from "../Typography";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";

interface TopHeaderProps {
    onToggleSidebar: () => void;
    onToggleCollapse: () => void;
    isSidebarCollapsed: boolean;
}

function Header({ onToggleSidebar, onToggleCollapse, isSidebarCollapsed }: TopHeaderProps) {
    const theme = useTheme();
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { hasPermission } = useHasPermission();
    const { data } = useAppSelector((state) => state.auth);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        dispatch(logout());
        navigator("/login");
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <HeaderContent>
            <Row $align="center" $gap={"xs"}>
                <HeaderBrand>
                    <GrConfigure color="#fff" size={24} />
                    <Text size="lg" variant="body1" weight="bold" color="white">
                        FixSite
                    </Text>
                </HeaderBrand>
                <Row $align="center" $gap={"md"}>
                    {window.innerWidth >= parseInt(theme.breakpoints.lg) ? (
                        <IconButton
                            icon={isSidebarCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
                            onClick={onToggleCollapse}
                            color="white"
                            size="md"
                            shape="circle"
                        />
                    ) : (
                        <IconButton
                            icon={<HiMiniBars3BottomLeft />}
                            onClick={onToggleSidebar}
                            variant="ghost"
                            color="white"
                            size="md"
                            shape="circle"
                        />
                    )}
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
            </Row>
            <OptionsContainer ref={menuRef}>
                <ItemUser onClick={toggleMenu}>
                    <FaUser color={theme.colors.white} />
                </ItemUser>

                <UserDropdown $isOpen={isMenuOpen}>
                    <UserMenuHeader>
                        <UserAvatar>
                            <FaUser size={20} color={theme.colors.primary} />
                        </UserAvatar>
                        <UserInfo>
                            <UserName>{data?.user?.name || "Usuario"}</UserName>
                            <UserEmail>{data?.user?.email || "Sin email"}</UserEmail>
                        </UserInfo>
                    </UserMenuHeader>

                    <MenuDivider />

                    <RolesSelector onSelect={() => setIsMenuOpen(false)} />

                    <MenuDivider />

                    <LogoutItem onClick={handleLogout}>
                        <LuLogOut size={16} />
                        <span>Cerrar Sesión</span>
                    </LogoutItem>
                </UserDropdown>
            </OptionsContainer>
        </HeaderContent>
    );
}

export default Header;
