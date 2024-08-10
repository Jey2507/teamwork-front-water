import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    modalType: null, 
    modalData: { 
      entryId: null,
    },
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type;
      state.modalData = {
        entryId: action.payload.entryId || null,
      };
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
      state.modalData = { entryId: null };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;