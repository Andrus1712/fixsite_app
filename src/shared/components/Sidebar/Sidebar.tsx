import type { JSX, ReactNode } from "react";
import {
    SidebarContainer,
    SidebarHeader,
    SidebarItem,
    SidebarItems,
    ModuleLabel,
    ModuleContainer,
    SidebarLabel,
    IconWrapper,
} from "./SidebarStyles";
import { useAppSelector } from "../../store";
import { FaBoxOpen, FaChartBar, FaCog, FaSignOutAlt, FaTools, FaUsers, FaUsersCog } from "react-icons/fa";

import TenantSelector from "../TenantSelector";
import { Row } from "../Layouts";
import { Text } from "../Typography";
import { useLocation } from "react-router";
import { GrConfigure } from "react-icons/gr";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import IconButton from "../Buttons/IconButton";
import { IoKey } from "react-icons/io5";
import { MdOutlineWebAsset } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useTheme } from "styled-components";
import { FaScrewdriverWrench } from "react-icons/fa6";

interface SidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    onToggle: () => void;
    onToggleCollapse: () => void;
}

const iconMap: Record<string, JSX.Element> = {
    FaUsers: <FaUsers />,
    FaSignOutAlt: <FaSignOutAlt />,
    FaChartBar: <FaChartBar />,
    FaCog: <FaCog />,
    FaTools: <FaTools />,
    FaUsersCog: <FaUsersCog />,
    IoKey: <IoKey />,
    FaBoxOpen: <FaBoxOpen />,
    MdOutlineWebAsset: <MdOutlineWebAsset />,
    HiMiniBars3BottomLeft: <HiMiniBars3BottomLeft />,
    GrConfigure: <GrConfigure />,
    IoIosArrowDown: <IoIosArrowDown />,
    FaScrewdriverWrench: <FaScrewdriverWrench />,
};

function Sidebar({ isOpen, isCollapsed, onToggle, onToggleCollapse }: SidebarProps) {
    const { data } = useAppSelector((state) => state.auth);
    const theme = useTheme();

    const isDesktop = window.innerWidth >= parseInt(theme.breakpoints.lg);

    return (
        <SidebarContainer $isOpen={isOpen} $isCollapsed={isCollapsed} $isDesktop={isDesktop}>
            <SidebarHeader>
                <Row fullWidth $align="center" $justify="space-between" $gap={12}>
                    {!isCollapsed && (
                        <Row $align="center" $gap={10} style={{ flex: 1 }}>
                            <GrConfigure color="#fff" size={24} />
                            <Text size="lg" variant="body1" weight="bold" color="white">
                                FixSite
                            </Text>
                            <Text size="xs" variant="caption" color="white" style={{ opacity: 0.8 }}>
                                v1
                            </Text>
                        </Row>
                    )}
                    {isDesktop ? (
                        <IconButton
                            size="md"
                            variant="solid"
                            color="inherit"
                            icon={isCollapsed ? <HiMiniBars3BottomLeft /> : <FaSignOutAlt />}
                            onClick={onToggleCollapse}
                        />
                    ) : (
                        <IconButton
                            size="md"
                            variant="solid"
                            color="inherit"
                            icon={<HiMiniBars3BottomLeft />}
                            onClick={onToggle}
                        />
                    )}
                </Row>
            </SidebarHeader>
            <div
                style={{ padding: isCollapsed ? "8px 8px" : "8px 12px", borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}
            >
                <TenantSelector isCollapsed={isCollapsed} />
            </div>
            <SidebarItems>
                {data?.modules &&
                    data?.modules.map((module) => (
                        <ModuleContainer key={module.id}>
                            {!isCollapsed && <ModuleLabel>{module.label}</ModuleLabel>}
                            {module.components
                                ?.slice()
                                .sort((a, b) => a.order - b.order || a.id - b.id)
                                .map((component) => (
                                    <MenuItem
                                        key={component.id}
                                        to={"/app" + component.path}
                                        label={component.label}
                                        icon={iconMap[component.icon]}
                                        onClick={() => {
                                            if (!isDesktop) {
                                                onToggle();
                                            }
                                        }}
                                        isCollapsed={isCollapsed}
                                    />
                                ))}
                        </ModuleContainer>
                    ))}
            </SidebarItems>
        </SidebarContainer>
    );
}

interface MenuItemProps {
    to: string;
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    isCollapsed: boolean;
}

const MenuItem = ({ to, label, icon, onClick, isCollapsed }: MenuItemProps) => {
    const location = useLocation();

    const isActive = () => {
        // Lógica personalizada para rutas relacionadas
        if (to === "/app/roles" && location.pathname.startsWith("/app/component")) {
            return true;
        }
        // Comportamiento por defecto
        return location.pathname === to;
    };

    return (
        <SidebarItem
            to={to}
            onClick={onClick}
            $isCollapsed={isCollapsed}
            className={({ isActive: defaultActive }) => (defaultActive || isActive() ? "active" : "")}
        >
            {icon && <IconWrapper>{icon}</IconWrapper>}
            {!isCollapsed && <SidebarLabel>{label}</SidebarLabel>}
            {isCollapsed && !icon && <SidebarLabel>{label.charAt(0)}</SidebarLabel>}
        </SidebarItem>
    );
};

export default Sidebar;
