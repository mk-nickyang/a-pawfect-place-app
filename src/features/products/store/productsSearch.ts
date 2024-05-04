import { create } from 'zustand';

type ProductsSearchStore = {
  visible: boolean;
  query: string;
  actions: {
    showSearch: () => void;
    hideSearch: () => void;
    updateSearchQuery: (newQuery: string) => void;
  };
};

const useProductsSearchStore = create<ProductsSearchStore>((set) => ({
  visible: false,
  query: '',
  actions: {
    showSearch: () => set({ visible: true }),
    hideSearch: () => set({ visible: false, query: '' }),
    updateSearchQuery: (newQuery) => set({ query: newQuery }),
  },
}));

// State hooks
export const useIsProductsSearchShowing = () =>
  useProductsSearchStore((state) => state.visible);
export const useIsSearchQueryEmpty = () =>
  useProductsSearchStore((state) => state.query.trim().length === 0);
export const useSearchQuery = () =>
  useProductsSearchStore((state) => state.query.trim());

// Action hook
export const useProductsSearchActions = () =>
  useProductsSearchStore((state) => state.actions);
