import { NavLink, useMatches, useLocation } from "react-router";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import { useAppSelector } from "../store";
import type { RootState } from "../store";
import type { IComponents, IModules } from "../../features/permissions/models/Permission";

const BreadcrumbContainer = styled.nav`
    padding: 0;
`;

const BreadcrumbList = styled.ol`
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: ${(props) => props.theme.fontSize.xs};
    flex-wrap: wrap;
`;

const BreadcrumbItem = styled.li`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.textMuted};
`;

const BreadcrumbLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
    font-weight: ${(props) => props.theme.fontWeight.medium};

    &:hover {
        color: ${(props) => props.theme.colors.primary};
    }
`;

const Separator = styled.span`
    margin: 0 ${(props) => props.theme.spacing.xs};
    color: ${(props) => props.theme.colors.gray300};
    display: flex;
    align-items: center;
    font-size: 10px;
`;

export default function Breadcrumbs() {
    const location = useLocation();
    const matches = useMatches();
    const { data } = useAppSelector((state: RootState) => state.auth);

    // Get all components to look up parent labels
    const allComponents = data?.modules?.flatMap((m: IModules) => m.components) || [];

    // Skip "app" from segments as it is our "Home"
    const pathnames = location.pathname.split("/").filter((x) => x && x !== "app");

    const crumbs = pathnames.map((value, index) => {
        const url = `/app/${pathnames.slice(0, index + 1).join("/")}`;

        // 1. Try to find label in current router matches
        const match = matches.find((m) => m.pathname === url);
        let label = (match?.handle as any)?.label || (match?.handle as any)?.title;

        // 2. If not found, try to find in components list (labels for parent paths)
        if (!label) {
            const component = allComponents.find((c: IComponents) => `/app${c.path}` === url);
            label = component?.label || component?.title;
        }

        // 3. Fallback to capitalized segment name
        if (!label) {
            label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
        }

        return {
            label,
            pathname: url,
        };
    });

    return (
        <BreadcrumbContainer>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink to="/app">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {crumbs.map((crumb, index) => (
                    <BreadcrumbItem key={crumb.pathname}>
                        <Separator>
                            <FaChevronRight />
                        </Separator>
                        {index === crumbs.length - 1 ? (
                            <span style={{ fontWeight: 700 }}>{crumb.label}</span>
                        ) : (
                            <BreadcrumbLink to={crumb.pathname}>{crumb.label}</BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </BreadcrumbContainer>
    );
}
