import {create} from "zustand";

interface OpenDialogState {
    showDetails: boolean;
    setShowDetails: (isOpen: boolean) => void;
    toggleDetails: () => void;
}

const useOpenDoctorDetailsDialog = create<OpenDialogState>((set) => ({
    showDetails: false,
    setShowDetails: (isOpen: boolean) => set({ showDetails: isOpen }),
    toggleDetails: () => set((state) => ({ showDetails: !state.showDetails })),
}));

export default useOpenDoctorDetailsDialog;