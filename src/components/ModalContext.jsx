import { createContext, useReducer } from 'react';

const MODAL_ACTIONS = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
};

const initialState = {
  isOpen: false,
  modalContent: null,
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case MODAL_ACTIONS.OPEN:
      return {
        ...state,
        isOpen: true,
        modalContent: action.payload,
      };
    case MODAL_ACTIONS.CLOSE:
      return {
        ...state,
        isOpen: false,
        modalContent: null,
      };
    default:
      return state;
  }
};

const ModalContext = createContext(initialState);

const ModalProvider = ({ children }) => {
  const [state, dispatchModal] = useReducer(modalReducer, initialState);

  const openModal = (content) => {
    dispatchModal({ type: MODAL_ACTIONS.OPEN, payload: content });
  };

  const closeModal = () => {
    dispatchModal({ type: MODAL_ACTIONS.CLOSE });
  };

  return (
    <ModalContext.Provider value={{ ...state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext };