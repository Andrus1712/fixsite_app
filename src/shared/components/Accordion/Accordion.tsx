import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Badge } from '../Badge';
import type { BadgeVariant } from '../Badge/Badge';
import {
    AccordionWrapper,
    AccordionHeader,
    HeaderLeft,
    HeaderRight,
    AccordionTitle,
    ChevronIcon,
    AccordionBody,
    AccordionContent,
} from './Accordion.styles';

export interface AccordionBadge {
    text: string;
    variant: BadgeVariant;
}

interface AccordionBaseProps {
    title: string;
    badge?: AccordionBadge;
    headerActions?: React.ReactNode;
    defaultExpanded?: boolean;
    children?: React.ReactNode;
    className?: string;
}

/** Item anidado dentro de un Accordion — misma API que el Accordion raíz */
export const AccordionItem: React.FC<AccordionBaseProps> = ({
    title,
    badge,
    headerActions,
    defaultExpanded = false,
    children,
    className,
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <AccordionWrapper $depth={1} className={className}>
            <AccordionHeader
                $expanded={expanded}
                $depth={1}
                onClick={() => setExpanded((p) => !p)}
            >
                <HeaderLeft>
                    <AccordionTitle $depth={1}>{title}</AccordionTitle>
                    {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
                </HeaderLeft>
                <HeaderRight>
                    {headerActions && (
                        <div onClick={(e) => e.stopPropagation()}>{headerActions}</div>
                    )}
                    <ChevronIcon $expanded={expanded}>
                        <FiChevronDown size={14} />
                    </ChevronIcon>
                </HeaderRight>
            </AccordionHeader>
            <AccordionBody $expanded={expanded}>
                <AccordionContent $depth={1}>{children}</AccordionContent>
            </AccordionBody>
        </AccordionWrapper>
    );
};

/** Acordeón raíz con título, badge, headerActions y children */
export const Accordion: React.FC<AccordionBaseProps> = ({
    title,
    badge,
    headerActions,
    defaultExpanded = false,
    children,
    className,
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <AccordionWrapper $depth={0} className={className}>
            <AccordionHeader
                $expanded={expanded}
                $depth={0}
                onClick={() => setExpanded((p) => !p)}
            >
                <HeaderLeft>
                    <AccordionTitle $depth={0}>{title}</AccordionTitle>
                    {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
                </HeaderLeft>
                <HeaderRight>
                    {headerActions && (
                        <div onClick={(e) => e.stopPropagation()}>{headerActions}</div>
                    )}
                    <ChevronIcon $expanded={expanded}>
                        <FiChevronDown size={16} />
                    </ChevronIcon>
                </HeaderRight>
            </AccordionHeader>
            <AccordionBody $expanded={expanded}>
                <AccordionContent $depth={0}>{children}</AccordionContent>
            </AccordionBody>
        </AccordionWrapper>
    );
};

export default Accordion;
