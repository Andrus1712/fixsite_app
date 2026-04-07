import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Button, DataTable, Flex, Input, Modal, TableIconButton, Text } from "../../../../shared/components";
import { IoAdd, IoTrash, IoSearch } from "react-icons/io5";
import { SearchContainer, ModalArticlesList, ArticleItem } from "./ItemsManagerStyles";

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
    currentQuantity: number;
    newQuantity: number;
}

interface ItemWithArticle extends Item {
    article: Article;
}

interface InventoryAdjustmentItemsManagerProps {
    items: Item[];
    articles: Article[];
    onChange: (items: Item[]) => void;
    error?: string;
}

export const InventoryAdjustmentItemsManager = ({ items, articles, onChange, error }: InventoryAdjustmentItemsManagerProps) => {
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

    const addItem = (articleId: Article) => {
        const exists = items.find(i => i.article_id === articleId.id);
        if (!exists) {
            onChange([...items, { article_id: articleId.id, currentQuantity: articleId?.stock ? articleId?.stock : 0, newQuantity: 0 }]);
        }
        setSearchSku("");
        setIsModalOpen(false);
    };

    const removeItem = useCallback((articleId: number) => {
        onChange(items.filter(i => i.article_id !== articleId));
    }, [items, onChange]);

    const updateCurrentQuantity = useCallback((articleId: number, currentQuantity: number) => {
        onChange(items.map(i =>
            i.article_id === articleId ? { ...i, currentQuantity: currentQuantity >= 0 ? currentQuantity : 0 } : i
        ));
    }, [items, onChange]);

    const updateNewQuantity = useCallback((articleId: number, newQuantity: number) => {
        onChange(items.map(i =>
            i.article_id === articleId ? { ...i, newQuantity: newQuantity >= 0 ? newQuantity : 0 } : i
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
                    <Text multiline={2} variant="label-sm">{row.original.article.description}</Text>
                </Flex>
            ),
        },
        {
            header: "Cantidad Actual",
            cell: ({ row }: any) => (
                <Input
                    variant="outlined"
                    type="number"
                    disabled
                    min={0}
                    value={row.original.currentQuantity}
                    onChange={(e) => updateCurrentQuantity(row.original.article_id, parseInt(e.target.value) || 0)} />
            ),
        },
        {
            header: "Nueva Cantidad",
            cell: ({ row }: any) => {
                console.log(row.original);
                
                const [localNewQuantity, setLocalNewQuantity] = useState(row.original.newQuantity);

                useEffect(() => {
                    setLocalNewQuantity(row.original.newQuantity);
                }, [row.original.newQuantity]);

                return (
                    <Input
                        variant="outlined"
                        type="number"
                        min={1}
                        value={localNewQuantity}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            setLocalNewQuantity(value);
                        }}
                        onBlur={() => {
                            updateNewQuantity(row.original.article_id, localNewQuantity);
                        }}
                    />
                );
            },
        },
        {
            header: "Diferencia",
            cell: ({ row }: any) => {
                const diff = row.original.newQuantity - row.original.currentQuantity;
                return (
                    <Text weight="semibold" style={{ color: diff > 0 ? "#16a34a" : diff < 0 ? "#dc2626" : "#6b7280" }}>
                        {diff > 0 ? `+${diff}` : diff}
                    </Text>
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
    ], [updateCurrentQuantity, updateNewQuantity, removeItem]);

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
                    <DataTable columns={columns} data={itemsWithArticles} getRowId={(row) => row.article_id.toString()} />
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
                                        onClick={() => addItem(article)}
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
