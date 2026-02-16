import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Button, DataTable, Flex, Input, Modal, TableIconButton, Text } from "../../../../shared/components";
import { IoAdd, IoTrash, IoSearch } from "react-icons/io5";
import { ItemsTable, SearchContainer, ModalArticlesList, ArticleItem } from "./ItemsManagerStyles";
import { Link } from "react-router";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import { PiMinus, PiPlus } from "react-icons/pi";

interface Article {
    id: number;
    name: string;
    sku: string;
    description?: string;
}

interface Item {
    article_id: number;
    quantity: number;
    unitCost?: number;
}

interface ItemWithArticle extends Item {
    article: Article;
}

interface ItemsManagerProps {
    items: Item[];
    articles: Article[];
    onChange: (items: Item[]) => void;
    error?: string;
}

export const ItemsManager = ({ items, articles, onChange, error }: ItemsManagerProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchSku, setSearchSku] = useState("");
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles || []);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isModalOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (!searchSku.trim()) {
            setFilteredArticles(articles || []);
        } else {
            const filtered = articles?.filter(a =>
                a.sku.toLowerCase().includes(searchSku.toLowerCase()) ||
                a.name.toLowerCase().includes(searchSku.toLowerCase())
            ) || [];
            setFilteredArticles(filtered);
        }
    }, [searchSku, articles]);

    const itemsWithArticles: ItemWithArticle[] = useMemo(() =>
        items.map(item => ({
            ...item,
            article: articles?.find(a => a.id === item.article_id)!
        })).filter(item => item.article),
        [items, articles]
    );

    const addItem = (articleId: number) => {
        const exists = items.find(i => i.article_id === articleId);
        if (!exists) {
            onChange([...items, { article_id: articleId, quantity: 1 }]);
        }
        setSearchSku("");
        setIsModalOpen(false);
    };

    const removeItem = useCallback((articleId: number) => {
        onChange(items.filter(i => i.article_id !== articleId));
    }, [items, onChange]);

    const updateQuantity = useCallback((articleId: number, quantity: number) => {
        onChange(items.map(i =>
            i.article_id === articleId ? { ...i, quantity: quantity > 0 ? quantity : 1 } : i
        ));
    }, [items, onChange]);

    const updateUnitCost = useCallback((articleId: number, unitCost: number) => {
        onChange(items.map(i =>
            i.article_id === articleId ? { ...i, unitCost: unitCost } : i
        ));
    }, [items, onChange]);

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && filteredArticles.length > 0) {
            addItem(filteredArticles[0].id);
        }
    };

    const columns = useMemo(() => [
        {
            accessorKey: "article.sku",
            header: "SKU",
        },
        {
            header: "Artículo",
            cell: ({ row }: any) => (
                <Flex gap={"xss"} direction="column">
                    <Text weight="semibold">{row.original.article.name}</Text>
                </Flex>
            )
        },
        {
            header: "Cantidad",
            cell: ({ row }: any) => (
                <Flex align="center" justify="space-between" gap={"xs"}>
                    <IconButton variant="ghost" size="xs" icon={<PiPlus />} color="success" onClick={() => updateQuantity(row.original.article_id, row.original.quantity + 1)} />
                    <Input
                        variant="outlined"
                        type="number"
                        min={1}
                        name={row.original.article_id}
                        value={row.original.quantity}
                        onChange={(e) => updateQuantity(row.original.article_id, parseInt(e.target.value) || 1)} />
                    <IconButton variant="ghost" size="xs" icon={<PiMinus />} color="danger" onClick={() => updateQuantity(row.original.article_id, row.original.quantity - 1)} />
                </Flex>
            )
        },
        {
            header: "Unidad de medida",
            accessorKey: "article.unit_measurement",
        },
        {
            header: "Costo Unitario",
            cell: ({ row }: any) => (
                <Flex align="center" justify="space-between" gap={"xs"}>
                    $
                    <Input
                        variant="outlined"
                        type="number"
                        min={1}
                        name={row.original.unitCost}
                        value={parseFloat(row.original.unitCost).toFixed(2)}
                        onChange={(e) => updateUnitCost(row.original.article_id, parseFloat(e.target.value))} />
                </Flex>
            ),
        },
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }: any) => (
                <Flex align="center" justify="flex-start">
                    <TableIconButton tooltip="Eliminar" color="danger" icon={<IoTrash />} onClick={() => removeItem(row.original.article_id)} />
                </Flex>
            ),
        }
    ], [updateQuantity, updateUnitCost, removeItem, itemsWithArticles]);

    return (
        <div>
            <Flex direction="column">
                <Flex justify="space-between" align="center">
                    <Text variant="body1" weight="semibold">Items</Text>
                    <Button
                        variant="primary"
                        onClick={() => setIsModalOpen(true)}
                        leftIcon={<IoAdd />}
                        type="button"
                    >
                        Agregar Nuevo Item
                    </Button>
                </Flex>

                {error && <div style={{ color: "#dc2626", fontSize: "14px", marginBottom: "8px" }}>{error}</div>}

                {itemsWithArticles.length > 0 ? (
                    <>
                        <DataTable columns={columns}
                            data={itemsWithArticles} />
                        {/* <ItemsTable>
                            <thead>
                                <tr>
                                    <th>SKU</th>
                                    <th>Artículo</th>
                                    <th style={{ width: "150px" }}>Cantidad</th>
                                    <th style={{ width: "80px" }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsWithArticles.map((item) => (
                                    <tr key={item.article_id}>
                                        <td>{item.article.sku}</td>
                                        <td>{item.article.name}</td>
                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.article_id, parseInt(e.target.value) || 1)}
                                                style={{
                                                    width: "100%",
                                                    padding: "6px 8px",
                                                    border: "1px solid #d1d5db",
                                                    borderRadius: "4px",
                                                    fontSize: "14px"
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.article_id)}
                                                style={{
                                                    background: "transparent",
                                                    border: "none",
                                                    color: "#dc2626",
                                                    cursor: "pointer",
                                                    padding: "4px",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <IoTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </ItemsTable> */}
                    </>
                ) : (
                    <div style={{
                        padding: "24px",
                        textAlign: "center",
                        color: "#6b7280",
                        border: "1px dashed #d1d5db",
                        borderRadius: "8px"
                    }}>
                        No hay items agregados. Haz clic en "Agregar Nuevo Item" para comenzar.
                    </div>
                )}
            </Flex>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSearchSku("");
                }}
                title="Seleccionar Artículo"
                size="lg"
            >
                <SearchContainer>
                    <IoSearch size={20} />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Buscar por SKU o nombre..."
                        value={searchSku}
                        onChange={(e) => setSearchSku(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />
                </SearchContainer>

                <ModalArticlesList>
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => {
                            const isAdded = items.some(i => i.article_id === article.id);
                            return (
                                <ArticleItem key={article.id}>
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                                            {article.sku} - {article.name}
                                        </div>
                                        {article.description && (
                                            <div style={{ fontSize: "13px", color: "#6b7280" }}>
                                                {article.description}
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        variant={isAdded ? "secondary" : "primary"}
                                        onClick={() => addItem(article.id)}
                                        disabled={isAdded}
                                        type="button"
                                    >
                                        {isAdded ? "Agregado" : "Agregar"}
                                    </Button>
                                </ArticleItem>
                            );
                        })
                    ) : (
                        <div style={{ padding: "24px", textAlign: "center", color: "#6b7280" }}>
                            {searchSku ? "No se encontraron artículos" : "No hay artículos disponibles"}
                        </div>
                    )}
                </ModalArticlesList>
            </Modal>
        </div>
    );
};
