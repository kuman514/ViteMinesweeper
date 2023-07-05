import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ModalStore, ModalType } from '^/types';

export const useModalStore = create<ModalStore>()(
  devtools((set) => ({
    modalType: ModalType.OFF,
    setModalType: (newModalType: ModalType) =>
      set((modalStore) => ({
        ...modalStore,
        modalType: newModalType,
      })),
  }))
);
