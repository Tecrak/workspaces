import { create } from "zustand";

type FormState = {
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
};

export const useFormWS = create<FormState>()((set) => ({
  isFormOpen: false,
  openForm: () => set({ isFormOpen: true }),
  closeForm: () => set({ isFormOpen: false }),
}));
