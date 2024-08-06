import css from "./WaterModal.module.css";
import WaterForm from "../WaterForm/WaterForm";
import {useModal} from "../../hooks/useModal";

const WaterModal = ({operationType}) => {
  const modalHeader = (operationType) => {
    switch (operationType) {
      case "add":
        return "Add water";
      case "edit":
        return "Edit the entered amount of water";
      default:
        return "Add Water";
    }
  };
  console.log(modalHeader(operationType));
  return (
    <div className={css.WaterModal}>
      <h1>{modalHeader(operationType)}</h1>
      <WaterForm operationType={operationType} />
    </div>
  );
};
export default WaterModal;
