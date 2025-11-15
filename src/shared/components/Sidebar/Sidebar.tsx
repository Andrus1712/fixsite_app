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
import {
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    FaTools,
    FaUsers,
    FaUsersCog,
} from "react-icons/fa";

import FixsiteLogo from "../../../assets/logo_fixsite2.png";
import TenantSelector from "../TenantSelector";

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
    FaUsersCog: <FaUsersCog />
};

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { data } = useAppSelector((state) => state.auth);

    return (
        <SidebarContainer $isOpen={isOpen}>
            <SidebarHeader>
                <img
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
                />
            </SidebarHeader>
            <TenantSelector />
            <SidebarItems>
                {data?.modules && data?.modules.map((module) => (
                    <ModuleContainer key={module.id}>
                        <ModuleLabel>{module.label}</ModuleLabel>
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
    return (
        <SidebarItem to={to} onClick={onClick}>
            {icon && <span>{icon}</span>}
            <span>{label}</span>
        </SidebarItem>
    );
};

export default Sidebar;
