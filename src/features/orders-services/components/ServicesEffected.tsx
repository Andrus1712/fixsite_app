import React, { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, DataTable, Input, SearchableSelect, TextArea } from '../../../shared/components';
import type { AvailableService } from '../models/OrderServiceModel';
import { IoTrash } from 'react-icons/io5';

const addServiceSchema = z.object({
    service_id: z.number({ required_error: 'Selecciona un servicio' }),
    price: z
        .number({ invalid_type_error: 'Debe ser un número' })
        .positive('Debe ser mayor a 0')
        .optional()
        .or(z.nan().transform(() => undefined)),
    estimated_minutes: z
        .number({ invalid_type_error: 'Debe ser un entero' })
        .int()
        .positive('Debe ser mayor a 0')
        .optional()
        .or(z.nan().transform(() => undefined)),
    notes: z.string().optional(),
});

type AddServiceForm = z.infer<typeof addServiceSchema>;

export interface SelectedService extends AvailableService {
    price_override?: number;
    estimated_minutes_override?: number;
    notes?: string;
}

interface ServicesEffectedProps {
    services: AvailableService[];
    selected: SelectedService[];
    isLoading?: boolean;
    onSearch: (value: string) => void;
    onAdd: (service: SelectedService) => void;
    onRemove: (serviceId: number) => void;
}

export const ServicesEffected: React.FC<ServicesEffectedProps> = ({
    services,
    selected,
    isLoading,
    onSearch,
    onAdd,
    onRemove,
}) => {
    const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<AddServiceForm>({
        resolver: zodResolver(addServiceSchema),
    });

    const serviceIdValue = watch('service_id');

    const options = useMemo(
        () =>
            services
                .filter((s) => !selected.some((sel) => sel.service_id === s.service_id))
                .map((s) => ({ value: s.service_id, label: `${s.code} - ${s.description}` })),
        [services, selected]
    );

    const onSubmit = (data: AddServiceForm) => {
        const service = services.find((s) => s.service_id === data.service_id);
        if (!service) return;
        onAdd({
            ...service,
            price_override: data.price,
            estimated_minutes_override: data.estimated_minutes,
            notes: data.notes,
        });
        reset();
    };

    const columns = useMemo<ColumnDef<SelectedService>[]>(
        () => [
            { accessorKey: 'service_id', header: 'ID', size: 60 },
            { accessorKey: 'code', header: 'Código', size: 110 },
            { accessorKey: 'description', header: 'Descripción' },
            {
                accessorKey: 'base_price',
                header: 'Precio Base',
                size: 110,
                cell: ({ getValue }) => `$${getValue<number>()}`,
            },
            {
                accessorKey: 'price_override',
                header: 'Precio',
                size: 100,
                cell: ({ row }) =>
                    row.original.price_override != null
                        ? `$${row.original.price_override}`
                        : `$${row.original.price}`,
            },
            {
                accessorKey: 'estimated_minutes_override',
                header: 'Tiempo (min)',
                size: 110,
                cell: ({ row }) =>
                    row.original.estimated_minutes_override ?? row.original.estimatedMinutes,
            },
            {
                id: 'accion',
                header: 'Acción',
                size: 100,
                cell: ({ row }) => (
                    <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<IoTrash />}
                        onClick={() => onRemove(row.original.service_id)}
                    >
                        Remover
                    </Button>
                ),
            },
        ],
        [onRemove]
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Controller
                        name="service_id"
                        control={control}
                        render={({ field }) => (
                            <SearchableSelect
                                label="Servicio"
                                placeholder="Buscar por código o descripción..."
                                options={options}
                                value={field.value ?? null}
                                onChange={(val) => {
                                    field.onChange(val);
                                    const svc = services.find((s) => s.service_id === val);
                                    if (svc) {
                                        setValue('price', svc.price);
                                        setValue('estimated_minutes', svc.estimatedMinutes);
                                    }
                                }}
                                onSearch={onSearch}
                                isLoading={isLoading}
                                allowClear={false}
                                fullWidth
                                error={errors.service_id?.message}
                            />
                        )}
                    />
                    {serviceIdValue && (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            label="Precio (opcional)"
                                            type="number"
                                            placeholder="Precio del servicio"
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                            error={errors.price?.message}
                                            fullWidth
                                        />
                                    )}
                                />
                                <Controller
                                    name="estimated_minutes"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            label="Tiempo estimado en minutos (opcional)"
                                            type="number"
                                            placeholder="Minutos"
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                            error={errors.estimated_minutes?.message}
                                            fullWidth
                                        />
                                    )}
                                />
                            </div>
                            <Controller
                                name="notes"
                                control={control}
                                render={({ field }) => (
                                    <TextArea
                                        label="Notas (opcional)"
                                        placeholder="Observaciones del servicio..."
                                        rows={2}
                                        {...field}
                                        error={errors.notes?.message}
                                    />
                                )}
                            />
                        </>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" variant="secondary" size="sm">
                            Agregar servicio
                        </Button>
                    </div>
                </div>
            </form>
            <DataTable columns={columns} data={selected} initialPageSize={10} />
        </div>
    );
};

export default ServicesEffected;
