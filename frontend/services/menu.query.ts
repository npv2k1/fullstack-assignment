import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import menuAPI, {
  MenuItem,
  CreateMenuDto,
  UpdateMenuDto,
} from "./menu.service";
import { toast } from "sonner";

export const menuKeys = {
  all: ["menus"] as const,
  lists: () => [...menuKeys.all, "list"] as const,
  list: (filters: string) => [...menuKeys.lists(), { filters }] as const,
  details: () => [...menuKeys.all, "detail"] as const,
  detail: (id: string) => [...menuKeys.details(), id] as const,
};

export function useMenus(options?: UseQueryOptions<MenuItem[]>) {
  return useQuery({
    queryKey: menuKeys.lists(),
    queryFn: () => menuAPI.getAllMenus(),
    ...options,
  });
}

export function useMenuItem(id: string, options?: UseQueryOptions<MenuItem>) {
  return useQuery({
    queryKey: menuKeys.detail(id),
    queryFn: () => menuAPI.getMenuItem(id),
    ...options,
  });
}

export function useMenuTree(
  id: string,
  options?: Omit<UseQueryOptions<MenuItem>, "queryKey">
) {
  return useQuery({
    queryKey: [...menuKeys.detail(id), "tree"],
    queryFn: () => menuAPI.getMenuTree(id),
    ...options,
  });
}

export function useCreateMenu(
  options?: UseMutationOptions<MenuItem, Error, CreateMenuDto>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMenuDto) => menuAPI.createMenuItem(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: menuKeys.lists() });
      queryClient.invalidateQueries(); // Invalidates all queries

      toast.success("Menu item created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create menu item");
      console.error("Error creating menu item:", error);
    },
    ...options,
  });
}

export function useUpdateMenu(
  id: string,
  options?: UseMutationOptions<MenuItem, Error, UpdateMenuDto>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMenuDto) => menuAPI.updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(); // Invalidates all queries

      toast.success("Menu item updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update menu item");
      console.error("Error updating menu item:", error);
    },
    ...options,
  });
}

export function useDeleteMenu(
  options?: UseMutationOptions<void, Error, string>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => menuAPI.deleteMenuItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.lists() });
      toast.success("Menu item deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete menu item");
      console.error("Error deleting menu item:", error);
    },
    ...options,
  });
}
