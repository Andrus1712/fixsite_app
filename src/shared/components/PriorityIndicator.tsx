import styled from "styled-components";

type Priority = 'low' | 'medium' | 'high';

interface PriorityIndicatorProps {
    priority: Priority;
    size?: number;
}

const Container = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
`;

const Arrow = styled.div<{ priority: Priority; size: number }>`
    width: 0;
    height: 0;
    border-left: ${props => props.size / 2}px solid transparent;
    border-right: ${props => props.size / 2}px solid transparent;
    
    ${props => {
        const colors = {
            low: '#10b981',    // Verde
            medium: '#f59e0b', // Amarillo
            high: '#ef4444'    // Rojo
        };
        
        if (props.priority === 'low') {
            return `border-top: ${props.size}px solid ${colors.low}; transform: rotate(180deg);`;
        } else if (props.priority === 'high') {
            return `border-bottom: ${props.size}px solid ${colors.high};`;
        } else {
            return `
                border-top: ${props.size / 2}px solid ${colors.medium};
                border-bottom: ${props.size / 2}px solid ${colors.medium};
            `;
        }
    }}
`;

const Label = styled.span<{ priority: Priority }>`
    font-size: 12px;
    font-weight: 500;
    text-transform: capitalize;
    color: ${props => {
        const colors = {
            low: '#10b981',
            medium: '#f59e0b', 
            high: '#ef4444'
        };
        return colors[props.priority];
    }};
`;

export default function PriorityIndicator({ priority, size = 12 }: PriorityIndicatorProps) {
    return (
        <Container>
            <Arrow priority={priority} size={size} />
            <Label priority={priority}>{priority}</Label>
        </Container>
    );
}