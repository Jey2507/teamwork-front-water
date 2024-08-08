import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    modalType: null, 
    modalData: null, 
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type; 
      state.modalData = action.payload.data; 
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
      state.modalData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

