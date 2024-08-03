import { useContext } from 'react';
import { ModalContext } from './ModalContext';

const useModalContext = () => {
  return useContext(ModalContext);
};

export default useModalContext;