import { useMatches } from "react-router";
import styled from "styled-components";
import { Heading } from "./Typography";

const TitleContainer = styled.div`
    padding: 5px 0;
    /* border-bottom: 1px solid #e5e7eb; */
    /* margin-bottom: 24px; */
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin: 0;
`;

export default function PageTitle() {
    const matches = useMatches();
    const currentMatch = matches[matches.length - 1];
    const title =
        (currentMatch?.handle as any)?.title ||
        (currentMatch?.handle as any)?.label ||
        "Inicio";

    return (
        <TitleContainer>
            {!(currentMatch?.handle as any)?.notFound ? (
                <Heading level="h2" color="gray800" truncate>
                    {title}
                </Heading>
            ) : null}
        </TitleContainer>
    );
}
