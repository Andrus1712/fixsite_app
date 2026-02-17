import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Button, DataTable, Flex, Input, Modal, TableIconButton, Text } from "../../../../shared/components";
import { IoAdd, IoTrash, IoSearch } from "react-icons/io5";
import { SearchContainer, ModalArticlesList, ArticleItem } from "./ItemsManagerStyles";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import { PiMinus, PiPlus } from "react-icons/pi";

interface Article {
    id: number;
    name: string;
    sku: string;
    description?: string;
    store_id?: number;
    stock?: number;
    store_name?: string;
}

interface Item {
    article_id: number;
    stock: number;
}

interface ItemWithArticle extends Item {
    article: Article;
}

interface StockTransferItemsManagerProps {
    items: Item[];
    articles: Article[];
    onChange: (items: Item[]) => void;
    error?: string;
}

export const StockTransferItemsManager = ({ items, articles, onChange, error }: StockTransferItemsManagerProps) => {
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
            onChange([...items, { article_id: articleId, stock: 1 }]);
        }
        setSearchSku("");
        setIsModalOpen(false);
    };

    const removeItem = useCallback((articleId: number) => {
        onChange(items.filter(i => i.article_id !== articleId));
    }, [items, onChange]);

    const updateStock = useCallback((articleId: number, stock: number) => {
        onChange(items.map(i =>
            i.article_id === articleId ? { ...i, stock: stock > 0 ? stock : 1 } : i
        ));
    }, [items, onChange]);

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
            ),
        },
        {
            header: "Cantidad",
            cell: ({ row }: any) => {
                const [localStock, setLocalStock] = useState(row.original.stock);

                useEffect(() => {
                    setLocalStock(row.original.stock);
                }, [row.original.stock]);

                return (
                    <Flex align="center" justify="space-between" gap={"xs"}>
                        <IconButton
                            variant="ghost"
                            size="xs"
                            icon={<PiPlus />}
                            color="success"
                            onClick={() => {
                                const newValue = localStock + 1;
                                setLocalStock(newValue);
                                updateStock(row.original.article_id, newValue);
                            }}
                        />

                        <Input
                            variant="outlined"
                            type="number"
                            min={1}
                            value={localStock}
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 1;
                                setLocalStock(value);
                            }}
                            onBlur={() => {
                                updateStock(row.original.article_id, localStock);
                            }}
                        />

                        <IconButton
                            variant="ghost"
                            size="xs"
                            icon={<PiMinus />}
                            color="danger"
                            onClick={() => {
                                const newValue = localStock - 1;
                                setLocalStock(newValue > 0 ? newValue : 1);
                                updateStock(row.original.article_id, newValue);
                            }}
                        />
                    </Flex>
                );
            },
        },
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }: any) => (
                <Flex align="center" justify="flex-start">
                    <TableIconButton tooltip="Eliminar" color="danger" icon={<IoTrash />} onClick={() => removeItem(row.original.article_id)} />
                </Flex>
            ),
            size: 50
        }
    ], [updateStock, removeItem]);

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
                    <DataTable columns={columns} data={itemsWithArticles} getRowId={(row) => row.article_id.toString()}
                    />
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
                    />
                </SearchContainer>

                <ModalArticlesList>
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => {
                            const isAdded = items.some(i => i.article_id === article.id);
                            return (
                                <ArticleItem key={article.id}>
                                    <Flex direction="column">
                                        <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                                            {article.sku} - {article.name}
                                        </div>
                                        {article.description && (
                                            <Text multiline={3} variant="label-sm">{article.description}</Text>
                                        )}
                                        <Text variant="body2" weight="semibold">Cantidad disponible: {article.stock}</Text>
                                    </Flex>
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
