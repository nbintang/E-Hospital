import { create } from "zustand";

interface OpenDialogState {
  showSignIn: boolean;
  showRegister: boolean;
  setShowSignIn: (isOpen: boolean) => void;
  setShowRegister: (show: boolean) => void;
  toggleSignIn: () => void;
  toggleRegister: () => void;
}

export const useOpenDialog = create<OpenDialogState>((set) => ({
  showSignIn: false,
  showRegister: false,
  setShowSignIn: (show) => set({ showSignIn: show }),
  setShowRegister: (show) => set({ showRegister: show }),
  toggleSignIn: () =>
    set((state) => ({ showSignIn: !state.showSignIn, showRegister: false })),
  toggleRegister: () =>
    set((state) => ({ showRegister: !state.showRegister, showSignIn: false })),
}));
