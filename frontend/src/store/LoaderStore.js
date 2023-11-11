const LoaderStore = (set, get) => ({
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
});

export default LoaderStore;