import { useMatches } from "react-router";
import styled, { useTheme } from "styled-components";
import { Heading } from "./Typography";

const TitleContainer = styled.div`
    padding: ${(props) => props.theme.spacing.sm} 0;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        margin-bottom: ${(props) => props.theme.spacing.md};
    }
`;


export default function PageTitle() {
    const matches = useMatches();
    const theme = useTheme();
    const currentMatch = matches[matches.length - 1];
    const title =
        (currentMatch?.handle as any)?.title ||
        (currentMatch?.handle as any)?.label ||
        "Inicio";

    return (
        <TitleContainer>
            {!(currentMatch?.handle as any)?.notFound ? (
                <Heading
                    level="h2"
                    color="gray800"
                    truncate
                    style={{
                        fontWeight: theme.fontWeight.semibold,
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </Heading>
            ) : null}
        </TitleContainer>
    );
}
