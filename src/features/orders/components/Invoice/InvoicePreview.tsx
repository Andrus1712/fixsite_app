import { forwardRef } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import type { InvoiceData } from "../../models/InvoiceModel";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat("es-VE", {
        style: "currency",
        currency: currency === "VES" ? "VES" : "USD",
        minimumFractionDigits: 2,
    }).format(amount);
};

const formatDate = (date: string): string => {
    return dayjs(date).format("DD/MM/YYYY");
};

// ─── Styled Components ────────────────────────────────────────────────────────

const InvoiceWrapper = styled.div`
    width: 100%;
    max-width: 210mm;
    margin: 0 auto;
    padding: 32px 40px;
    background: #ffffff;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 13px;
    color: #1f2937;
    line-height: 1.5;

    @media print {
        padding: 20mm;
        max-width: none;
        box-shadow: none;
    }
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #2e5bff;
`;

const BusinessInfo = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
`;

const Logo = styled.img`
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 8px;
`;

const LogoPlaceholder = styled.div`
    width: 60px;
    height: 60px;
    background: #2e5bff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-weight: 700;
    font-size: 20px;
`;

const BusinessDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const BusinessName = styled.h1`
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
`;

const BusinessMeta = styled.span`
    font-size: 12px;
    color: #6b7280;
`;

const InvoiceTitle = styled.div`
    text-align: right;
`;

const InvoiceLabel = styled.h2`
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: #2e5bff;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const InvoiceMeta = styled.div`
    margin-top: 4px;
    font-size: 12px;
    color: #6b7280;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
`;

const TwoColumns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
`;

const InfoBlock = styled.div`
    padding: 12px 16px;
    background: #f9fafb;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
`;

const InfoBlockTitle = styled.h3`
    margin: 0 0 8px 0;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #2e5bff;
`;

const InfoRow = styled.div`
    display: flex;
    gap: 6px;
    margin-bottom: 4px;
    font-size: 12px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const InfoLabel = styled.span`
    font-weight: 600;
    color: #374151;
    min-width: 70px;
`;

const InfoValue = styled.span`
    color: #4b5563;
`;

const SectionTitle = styled.h3`
    margin: 0 0 8px 0;
    font-size: 13px;
    font-weight: 700;
    color: #111827;
    text-transform: uppercase;
    letter-spacing: 0.3px;
`;

const ItemsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 12px;
`;

const TableHead = styled.thead`
    background: #2e5bff;
    color: #ffffff;

    th {
        padding: 8px 12px;
        text-align: left;
        font-weight: 600;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.3px;

        &:last-child {
            text-align: right;
        }

        &:nth-child(2),
        &:nth-child(3) {
            text-align: center;
        }
    }
`;

const TableBody = styled.tbody`
    tr {
        border-bottom: 1px solid #e5e7eb;

        &:nth-child(even) {
            background: #f9fafb;
        }
    }

    td {
        padding: 8px 12px;
        color: #374151;

        &:last-child {
            text-align: right;
            font-weight: 500;
        }

        &:nth-child(2),
        &:nth-child(3) {
            text-align: center;
        }
    }
`;

const TotalsSection = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
`;

const TotalsTable = styled.div`
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const TotalRow = styled.div<{ $bold?: boolean; $highlight?: boolean }>`
    display: flex;
    justify-content: space-between;
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 4px;

    ${(props) =>
        props.$highlight &&
        `
        background: #2e5bff;
        color: #ffffff;
        font-size: 14px;
        font-weight: 700;
        margin-top: 4px;
    `}

    ${(props) =>
        props.$bold &&
        `
        font-weight: 600;
        border-top: 1px solid #e5e7eb;
        padding-top: 8px;
    `}
`;

const TotalLabel = styled.span``;
const TotalValue = styled.span``;

const Footer = styled.footer`
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
`;

const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
    font-size: 12px;
`;

const FooterItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const FooterLabel = styled.span`
    font-weight: 600;
    color: #374151;
`;

const FooterValue = styled.span`
    color: #6b7280;
`;

const NotesBlock = styled.div`
    padding: 10px 14px;
    background: #fffbeb;
    border: 1px solid #fcd34d;
    border-radius: 6px;
    margin-bottom: 16px;
    font-size: 12px;
    color: #92400e;
`;

const ThankYou = styled.div`
    text-align: center;
    padding-top: 16px;
    border-top: 1px dashed #d1d5db;
    font-size: 13px;
    font-weight: 500;
    color: #6b7280;
`;

// ─── Component ────────────────────────────────────────────────────────────────

interface InvoicePreviewProps {
    data: InvoiceData;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
    ({ data }, ref) => {
        const { business, invoice, customer, device, services, parts, totals, technician, notes } = data;
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

        return (
            <InvoiceWrapper ref={ref}>
                {/* ─── Header ─── */}
                <Header>
                    <BusinessInfo>
                        {business.logo_url ? (
                            <Logo
                                src={`${apiBaseUrl}${business.logo_url}`}
                                alt={business.name}
                                crossOrigin="anonymous"
                            />
                        ) : (
                            <LogoPlaceholder>
                                {business.name.charAt(0).toUpperCase()}
                            </LogoPlaceholder>
                        )}
                        <BusinessDetails>
                            <BusinessName>{business.name}</BusinessName>
                            <BusinessMeta>{business.address}</BusinessMeta>
                            <BusinessMeta>{business.phone} | {business.email}</BusinessMeta>
                            <BusinessMeta>RIF/NIT: {business.tax_id}</BusinessMeta>
                        </BusinessDetails>
                    </BusinessInfo>
                    <InvoiceTitle>
                        <InvoiceLabel>Factura</InvoiceLabel>
                        <InvoiceMeta>
                            <span>#{invoice.number}</span>
                            <span>Fecha: {formatDate(invoice.date)}</span>
                            <span>Orden: {invoice.order_code}</span>
                        </InvoiceMeta>
                    </InvoiceTitle>
                </Header>

                {/* ─── Customer & Device ─── */}
                <TwoColumns>
                    <InfoBlock>
                        <InfoBlockTitle>Cliente</InfoBlockTitle>
                        <InfoRow>
                            <InfoLabel>Nombre:</InfoLabel>
                            <InfoValue>{customer.name}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Teléfono:</InfoLabel>
                            <InfoValue>{customer.phone}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Email:</InfoLabel>
                            <InfoValue>{customer.email}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Dirección:</InfoLabel>
                            <InfoValue>{customer.address}</InfoValue>
                        </InfoRow>
                    </InfoBlock>

                    {device && (
                        <InfoBlock>
                            <InfoBlockTitle>Dispositivo</InfoBlockTitle>
                            <InfoRow>
                                <InfoLabel>Equipo:</InfoLabel>
                                <InfoValue>{device.name}</InfoValue>
                            </InfoRow>
                            <InfoRow>
                                <InfoLabel>Marca:</InfoLabel>
                                <InfoValue>{device.brand}</InfoValue>
                            </InfoRow>
                            <InfoRow>
                                <InfoLabel>Modelo:</InfoLabel>
                                <InfoValue>{device.model}</InfoValue>
                            </InfoRow>
                            {device.serial_number && (
                                <InfoRow>
                                    <InfoLabel>S/N:</InfoLabel>
                                    <InfoValue>{device.serial_number}</InfoValue>
                                </InfoRow>
                            )}
                            {device.imei && (
                                <InfoRow>
                                    <InfoLabel>IMEI:</InfoLabel>
                                    <InfoValue>{device.imei}</InfoValue>
                                </InfoRow>
                            )}
                        </InfoBlock>
                    )}

                    {!device && (
                        <InfoBlock>
                            <InfoBlockTitle>Dispositivo</InfoBlockTitle>
                            <InfoRow>
                                <InfoValue>No aplica</InfoValue>
                            </InfoRow>
                        </InfoBlock>
                    )}
                </TwoColumns>

                {/* ─── Services Table ─── */}
                {services.length > 0 && (
                    <>
                        <SectionTitle>Servicios Realizados</SectionTitle>
                        <ItemsTable>
                            <TableHead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Cant.</th>
                                    <th>P. Unit.</th>
                                    <th>Total</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {services.map((item, idx) => (
                                    <tr key={`svc-${idx}`}>
                                        <td>{item.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>{formatCurrency(item.unit_price, totals.currency)}</td>
                                        <td>{formatCurrency(item.total, totals.currency)}</td>
                                    </tr>
                                ))}
                            </TableBody>
                        </ItemsTable>
                    </>
                )}

                {/* ─── Parts Table ─── */}
                {parts.length > 0 && (
                    <>
                        <SectionTitle>Repuestos Utilizados</SectionTitle>
                        <ItemsTable>
                            <TableHead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Cant.</th>
                                    <th>P. Unit.</th>
                                    <th>Total</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {parts.map((item, idx) => (
                                    <tr key={`part-${idx}`}>
                                        <td>{item.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>{formatCurrency(item.unit_price, totals.currency)}</td>
                                        <td>{formatCurrency(item.total, totals.currency)}</td>
                                    </tr>
                                ))}
                            </TableBody>
                        </ItemsTable>
                    </>
                )}

                {/* ─── Totals ─── */}
                <TotalsSection>
                    <TotalsTable>
                        {services.length > 0 && (
                            <TotalRow>
                                <TotalLabel>Subtotal Servicios:</TotalLabel>
                                <TotalValue>{formatCurrency(totals.subtotal_services, totals.currency)}</TotalValue>
                            </TotalRow>
                        )}
                        {parts.length > 0 && (
                            <TotalRow>
                                <TotalLabel>Subtotal Repuestos:</TotalLabel>
                                <TotalValue>{formatCurrency(totals.subtotal_parts, totals.currency)}</TotalValue>
                            </TotalRow>
                        )}
                        <TotalRow $bold>
                            <TotalLabel>Subtotal:</TotalLabel>
                            <TotalValue>{formatCurrency(totals.subtotal, totals.currency)}</TotalValue>
                        </TotalRow>
                        {totals.tax_amount > 0 && (
                            <TotalRow>
                                <TotalLabel>IVA ({totals.tax_rate}%):</TotalLabel>
                                <TotalValue>{formatCurrency(totals.tax_amount, totals.currency)}</TotalValue>
                            </TotalRow>
                        )}
                        {totals.discount > 0 && (
                            <TotalRow>
                                <TotalLabel>Descuento:</TotalLabel>
                                <TotalValue>-{formatCurrency(totals.discount, totals.currency)}</TotalValue>
                            </TotalRow>
                        )}
                        <TotalRow $highlight>
                            <TotalLabel>TOTAL:</TotalLabel>
                            <TotalValue>{formatCurrency(totals.total, totals.currency)}</TotalValue>
                        </TotalRow>
                    </TotalsTable>
                </TotalsSection>

                {/* ─── Footer ─── */}
                <Footer>
                    <FooterGrid>
                        {technician && (
                            <FooterItem>
                                <FooterLabel>Técnico responsable:</FooterLabel>
                                <FooterValue>{technician.name}</FooterValue>
                            </FooterItem>
                        )}
                        <FooterItem>
                            <FooterLabel>Recibido:</FooterLabel>
                            <FooterValue>{formatDate(invoice.received_date)}</FooterValue>
                        </FooterItem>
                        <FooterItem>
                            <FooterLabel>Entregado:</FooterLabel>
                            <FooterValue>{formatDate(invoice.delivered_date)}</FooterValue>
                        </FooterItem>
                    </FooterGrid>

                    {notes && (
                        <NotesBlock>
                            <strong>Notas:</strong> {notes}
                        </NotesBlock>
                    )}

                    <ThankYou>
                        Gracias por su preferencia
                    </ThankYou>
                </Footer>
            </InvoiceWrapper>
        );
    }
);

InvoicePreview.displayName = "InvoicePreview";
