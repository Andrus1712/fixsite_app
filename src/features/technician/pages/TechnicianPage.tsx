import { useMemo, useState } from "react";
import { useGetAllTechnicniansQuery } from "../services/TechnicianApi";
import { Box, Button, Container, DataTable, LoadingSpinner } from "../../../shared/components";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useHasPermission } from "../../auth/hooks/useHasPermission";

const TechnicianPage = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const { data, isLoading } = useGetAllTechnicniansQuery({ page, limit, filter: searchValue });
    const navigator = useNavigate();
    const { hasPermission } = useHasPermission();

    // "email": "demo1@gmail.com",
    // "phone": "3177765722",
    // "specialty": "ING",
    // "level": "2",
    // "certification": "N"

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "#",
            },
            {
                accessorKey: "name",
                header: "Nombre",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "phone",
                header: "Teléfono",
            },
            {
                accessorKey: "specialty",
                header: "Especialidad",
            },
            {
                accessorKey: "level",
                header: "Nivel",
            },
            {
                accessorKey: "certification",
                header: "Certificación",
            },
        ],
        []
    );

    return (
        <Container size="full" center>
            <Box
                $p="lg"
                $shadow
                rounded
                $fullWidth
                title="Ordenes"
                bg="white"
                headerActions={
                    <>
                        {hasPermission("technician-new") && (
                            <Button
                                leftIcon={<FaPlus />}
                                variant="success"
                                onClick={() => navigator("/app/technicians/new")}
                            >
                                Nuevo
                            </Button>
                        )}
                    </>
                }
            >
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <DataTable
                        data={data?.data || []}
                        columns={columns}
                        initialPageSize={limit ?? 25}
                        pageSizeOptions={[10, 25, 50, 100]}
                        serverSide={true}
                        page={data?.pagination.page}
                        total={data?.pagination.total}
                        totalPages={data?.pagination.totalPages}
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        onPageChange={setPage}
                        onPageSizeChange={setLimit}
                        maxHeight={500}
                    />
                )}
            </Box>
        </Container>
    );
};

export default TechnicianPage;
