import { create } from 'zustand';

type ProductsSearchStore = {
  isSearchBarFocused: boolean;
  searchQuery: string;
  actions: {
    focusSearchBar: () => void;
    unFocusSearchBar: () => void;
    updateSearchQuery: (newQuery: string) => void;
  };
};

const useProductsSearchStore = create<ProductsSearchStore>((set) => ({
  isSearchBarFocused: false,
  searchQuery: '',
  actions: {
    focusSearchBar: () => set({ isSearchBarFocused: true }),
    unFocusSearchBar: () => set({ isSearchBarFocused: false }),
    updateSearchQuery: (newQuery) => set({ searchQuery: newQuery }),
  },
}));

// State hooks
export const useIsSearchBarFocused = () =>
  useProductsSearchStore((state) => state.isSearchBarFocused);
export const useIsSearchQueryEmpty = () =>
  useProductsSearchStore((state) => state.searchQuery.trim().length === 0);

// Action hook
export const useSearchBarActions = () =>
  useProductsSearchStore((state) => state.actions);
