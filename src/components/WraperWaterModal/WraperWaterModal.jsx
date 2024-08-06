import {useModal} from "../../hooks/useModal.js";
import {useCallback} from "react";
import WaterModal from "../WaterModal/WaterModal.jsx";

const SomeComponent = () => {
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} operationType={"edit"} />);
  }, [setModal, closeModal]);

  return (
    <div>
      <h2>Component Title</h2>
      <p>Some component content</p>

      <button type="button" onClick={openModal}>
        OpenModal
      </button>
    </div>
  );
};

export default SomeComponent;
