import { create } from "zustand";

type OpenDialogState = {
  showWarn: boolean;
  setShowWarn: (isOpen: boolean) => void;
};

const useOpenWarnIncompleteProfile = create<OpenDialogState>((set) => ({
  showWarn: false,
  setShowWarn: (isOpen: boolean) => set({ showWarn: isOpen }),
}));

export default useOpenWarnIncompleteProfile;
