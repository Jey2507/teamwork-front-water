import React from 'react';
import LogOutModal from '../../components/LogOutModal/LogOutModal.jsx';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal.jsx'; // Імпорт `DeleteWaterModal`
import useModalContext from '../../components/useModalContext';

const TestPage = () => {
  const { openModal, closeModal, modalContent } = useModalContext();

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={() => openModal(<LogOutModal />)}>Open LogOut Modal</button>
      <button onClick={() => openModal(<DeleteWaterModal entryId={1} />)}>Open DeleteWater Modal</button> {/* Додана кнопка для `DeleteWaterModal` */}
      {modalContent}
    </div>
  );
};

export default TestPage;