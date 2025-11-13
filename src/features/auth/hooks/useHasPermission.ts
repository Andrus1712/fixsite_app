import { useAppSelector } from "../../../shared/store";

export const useHasPermission = () => {
    const { permission } = useAppSelector(state => state.auth);

    const hasPermission = (permissionKey: string) => {
        return permission?.some((p) => p.key === permissionKey);
    };
    return {
        hasPermission,
        permission
    };
};