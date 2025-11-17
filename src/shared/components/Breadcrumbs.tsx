import { NavLink, useMatches } from "react-router";
import styled from "styled-components";
import { Text } from "./Typography";

const BreadcrumbContainer = styled.nav`
    padding: 5px 0;
    /* margin-bottom: 16px; */
`;

const BreadcrumbList = styled.ol`
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 14px;
`;

const BreadcrumbItem = styled.li`
    display: flex;
    align-items: center;
`;

const BreadcrumbLink = styled(NavLink)`
    text-decoration: none;
    color: ${(props) =>
        props.color === props.theme.colors.text ? "#1F2937" : "inherit"};

    &:hover {
        color: #374151;
        text-decoration: underline;
    }
`;

const BreadcrumbText = styled.span`
    color: #374151;
    font-weight: 500;
`;

const Separator = styled.span`
    margin: 0 8px;
    color: #9ca3af;
`;

export default function Breadcrumbs() {
    const matches = useMatches();

    const crumbs = matches
        .filter((match) => match.handle && (match.handle as any)?.label)
        .map((match) => ({
            label: (match.handle as any)?.label,
            pathname: match.pathname,
        }));

    if (crumbs.length === 0) return null;

    return (
        <BreadcrumbContainer>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink to="/app">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {crumbs.map((crumb, index) => (
                    <BreadcrumbItem key={crumb.pathname}>
                        <Separator>&gt;</Separator>
                        {index === crumbs.length - 1 ? (
                            <Text color="secondary">{crumb.label}</Text>
                        ) : (
                            <Text color="primary">
                                <BreadcrumbLink
                                    color="primary"
                                    to={crumb.pathname}
                                >
                                    {crumb.label}
                                </BreadcrumbLink>
                            </Text>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </BreadcrumbContainer>
    );
}
