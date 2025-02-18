import { api } from "./request";

export interface MenuItem {
  id: string;
  name: string;
  parentId?: string;
  children?: MenuItem[];
  parent?: MenuItem;
  depth?: number;
}

export interface CreateMenuDto {
  name: string;
  parentId?: string;
}

export interface UpdateMenuDto {
  name?: string;
  parentId?: string;
}

const MENU_API = {
  getAllMenus: () => api.get<MenuItem[]>("/menu"),

  getMenuTree: (id: string) => api.get<MenuItem>(`/menu/${id}/tree`),

  getMenuItem: (id: string) => api.get<MenuItem>(`/menu/${id}`),

  createMenuItem: (data: CreateMenuDto) => api.post<MenuItem>("/menu", data),

  updateMenuItem: (id: string, data: UpdateMenuDto) =>
    api.patch<MenuItem>(`/menu/${id}`, data),

  deleteMenuItem: (id: string) => api.delete<void>(`/menu/${id}`),
};

export default MENU_API;
