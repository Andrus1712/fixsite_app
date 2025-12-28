import type { JSX, ReactNode } from "react";
import {
    SidebarContainer,
    SidebarHeader,
    SidebarItem,
    SidebarItems,
    ModuleLabel,
    ModuleContainer,
} from "./SidebarStyles";
import { useAppSelector } from "../../store";
import { FaChartBar, FaCog, FaSignOutAlt, FaTools, FaUsers, FaUsersCog } from "react-icons/fa";

import FixsiteLogo from "../../../assets/logo_fixsite2.png";
import TenantSelector from "../TenantSelector";
import { Divider, Row } from "../Layouts";
import { Label, Text } from "../Typography";
import { useLocation } from "react-router";
import { GrConfigure } from "react-icons/gr";
import { IconButton } from "../Buttons";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const iconMap: Record<string, JSX.Element> = {
    FaUsers: <FaUsers />,
    FaSignOutAlt: <FaSignOutAlt />,
    FaChartBar: <FaChartBar />,
    FaCog: <FaCog />,
    FaTools: <FaTools />,
    FaUsersCog: <FaUsersCog />,
};

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { data } = useAppSelector((state) => state.auth);

    return (
        <SidebarContainer $isOpen={isOpen}>
            <SidebarHeader>
                {/* <img
                    src={FixsiteLogo}
                    alt="Fixsite App Logo"
                    // Estilos en línea para asegurar que sea proporcional al alto del header
                    // Normalmente, el estilo se agregaría a SidebarHeader en SidebarStyles,
                    // pero esto lo hace de forma inmediata. 'height: 100%' hace que llene
                    // el alto del contenedor 'SidebarHeader' y 'objectFit: "contain"'
                    // asegura que la imagen sea proporcional y no se corte.
                    style={{
                        width: "100%",
                        // margin: "auto",
                        objectFit: "fill",
                        scale: "0.6",
                        // padding: "2px",
                    }}
                /> */}
                <Row fullWidth $align="center" $justify="flex-start" $gap={10} style={{ padding: "0 10px" }}>
                    <GrConfigure color="#fff" size={30} />
                    <Text size={"2xl"} variant="body1" weight="bold" color="white">
                        FixSite v1
                    </Text>
                </Row>
            </SidebarHeader>
            <TenantSelector />
            <Divider width="90%" opacity={0.4} margin={"sm"} />
            <SidebarItems>
                {data?.modules &&
                    data?.modules.map((module) => (
                        <ModuleContainer key={module.id}>
                            <Row style={{ padding: "5px 10px" }}>
                                <Text variant="caption" weight="semibold" uppercase color="gray300">
                                    {module.label}
                                </Text>
                            </Row>
                            {module.components
                                ?.slice()
                                .sort((a, b) => a.order - b.order || a.id - b.id)
                                .map((component) => (
                                    <MenuItem
                                        key={component.id}
                                        to={"/app" + component.path}
                                        label={component.label}
                                        icon={iconMap[component.icon]}
                                        onClick={onClose}
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
}

const MenuItem = ({ to, label, icon, onClick }: MenuItemProps) => {
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
            className={({ isActive: defaultActive }) => (defaultActive || isActive() ? "active" : "")}
        >
            <div>{icon && <span>{icon}</span>}</div>
            <Text color="white">{label}</Text>
        </SidebarItem>
    );
};

export default Sidebar;
