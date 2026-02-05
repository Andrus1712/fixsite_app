import { useMatches } from "react-router";
import styled from "styled-components";
import { Heading, Subtitle } from "./Typography";
import Breadcrumbs from "./Breadcrumbs";

const HeaderWrapper = styled.div`
    margin-bottom: ${(props) => props.theme.spacing.lg};
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.xs};
`;

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.xxs};
`;

const StyledHeading = styled(Heading)`
    word-break: break-word;
    hyphens: auto;
    letter-spacing: -0.02em;
`;

const BreadcrumbWrapper = styled.div`
    margin-bottom: ${(props) => props.theme.spacing.xxs};
`;

export default function PageTitle() {
    const matches = useMatches();
    const currentMatch = matches[matches.length - 1];

    const handle = currentMatch?.handle as any;

    const title = handle?.title || handle?.label || "Inicio";
    const description = handle?.description || handle?.subtitle;

    if (handle?.notFound) return null;

    return (
        <HeaderWrapper>
            <BreadcrumbWrapper>
                <Breadcrumbs />
            </BreadcrumbWrapper>
            <TitleSection>
                <StyledHeading
                    level="h2"
                    color="gray900"
                >
                    {title}
                </StyledHeading>
                {description && (
                    <Subtitle variant="subtitle2" color="muted">
                        {description}
                    </Subtitle>
                )}
            </TitleSection>
        </HeaderWrapper>
    );
}
