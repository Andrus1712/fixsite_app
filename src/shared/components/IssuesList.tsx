import { useState } from "react";
import styled from "styled-components";

interface Issue {
    issue_name: string;
}

interface IssuesListProps {
    issues: Issue[];
}

const Container = styled.div`
    position: relative;
`;

const IssueItem = styled.div`
    font-size: 12px;
    color: #374151;
    padding: 2px 0;
    line-height: 1.3;
`;

const ToggleButton = styled.button`
    background: none;
    border: none;
    color: #3b82f6;
    font-size: 11px;
    cursor: pointer;
    padding: 2px 4px;
    text-decoration: underline;
    
    &:hover {
        color: #2563eb;
    }
`;

const ExpandedList = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    min-width: 200px;
    max-width: 300px;
    padding: 8px;
`;

export default function IssuesList({ issues }: IssuesListProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!issues || issues.length === 0) {
        return <IssueItem>No issues</IssueItem>;
    }

    if (issues.length === 1) {
        return <IssueItem>{issues[0].issue_name}</IssueItem>;
    }

    return (
        <Container>
            <IssueItem>{issues[0].issue_name}</IssueItem>
            <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Ver menos' : `+${issues.length - 1} más`}
            </ToggleButton>
            {isExpanded && (
                <ExpandedList>
                    {issues.map((issue, index) => (
                        <IssueItem key={index}>{issue.issue_name}</IssueItem>
                    ))}
                </ExpandedList>
            )}
        </Container>
    );
}