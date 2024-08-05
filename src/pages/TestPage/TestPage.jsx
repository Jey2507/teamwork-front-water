import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/ModalSlice';
import LogOutModal from '../../components/LogOutModal/LogOutModal';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal';

const TestPage = () => {
  const dispatch = useDispatch();
  const { isModalOpen, modalType, modalData } = useSelector((state) => state.modal);

  const renderModal = () => {
    switch (modalType) {
      case 'LOGOUT':
        return <LogOutModal />;
      case 'DELETE_WATER':
        return <DeleteWaterModal />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={() => dispatch(openModal({ type: 'LOGOUT' }))}>
        Open LogOut Modal
      </button>
      <button onClick={() => dispatch(openModal({ type: 'DELETE_WATER', data: { entryId: 1 } }))}>
        Open Delete Water Modal
      </button>
      {isModalOpen && renderModal()}
    </div>
  );
};

export default TestPage;

/* 
import { useDispatch, useSelector } from 'react-redux';
import LogOutModal from '../../components/LogOutModal/LogOutModal';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal';
import { openModal } from '../../redux/ModalSlice.js';

const TestPage = () => {
  const dispatch = useDispatch();
  const modalContent = useSelector((state) => state.modal.modalContent);

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={() => dispatch(openModal(<LogOutModal />))}>Open LogOut Modal</button>
      <button onClick={() => dispatch(openModal(<DeleteWaterModal />))}>Open DeleteWater Modal</button>

      {modalContent}
    </div>
  );
};

export default TestPage; */

