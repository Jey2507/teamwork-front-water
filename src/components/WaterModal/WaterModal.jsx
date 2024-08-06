import css from "./WaterModal.module.css";
import WaterForm from "../WaterForm/WaterForm";
import svgSprite from "../../assets/sprite.svg";

const WaterModal = ({
  operationType,
  onClose,
  water = {},
  timestampFromUrl = "",
}) => {
  const handleClose = () => {
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, 300);
  };

  const modalHeader = (operationType) => {
    switch (operationType) {
      case "add":
        return "Add Water";
      case "edit":
        return "Edit Water Amount";
      default:
        return "Add Water";
    }
  };

  const curentTimestamp = Number(timestampFromUrl);
  const recordTimestamp = Number(water.date);

  const editTime = (operationType) => {
    switch (operationType) {
      case "add":
        return curentTimestamp;
      case "edit":
        return recordTimestamp;
      default:
        return curentTimestamp;
    }
  };

  const waterPortion = (operationType) => {
    switch (operationType) {
      case "add":
        return 50;
      case "edit":
        return water.amount;
      default:
        return 50;
    }
  };

  const waterID = (operationType) => {
    switch (operationType) {
      case "add":
        return null;
      case "edit":
        return water.id;
      default:
        return null;
    }
  };

  return (
    <div className={css.WaterModal}>
      <h1>{modalHeader(operationType)}</h1>
      <WaterForm
        operationType={operationType}
        editTime={editTime(operationType)}
        waterPortion={waterPortion(operationType)}
        waterID={waterID(operationType)}
        handleClose={handleClose}
      />
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close Water Modal"
        className={css.WaterModalCloseBtn}>
        <svg>
          <use xlinkHref={svgSprite + "#icon-clear"}></use>
        </svg>
      </button>
    </div>
  );
};

export default WaterModal;
