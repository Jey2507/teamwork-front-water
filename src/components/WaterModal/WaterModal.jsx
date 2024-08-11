import { useState, useEffect } from "react";
import css from "./WaterModal.module.css";
import WaterForm from "../WaterForm/WaterForm";
import svgSprite from "../../assets/sprite.svg";

const WaterModal = ({ operationType, onClose, water = {}, timestampFromUrl = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      setIsVisible(false);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const modalHeader = (operationType) => {
    switch (operationType) {
      case 'add':
        return 'Add Water';
      case 'edit':
        return 'Edit Water Amount';
      default:
        return 'Add Water';
    }
  };

  const curentTimestamp = Number(timestampFromUrl);
  const recordTimestamp = Number(water.date);

  const editTime = (operationType) => {
    switch (operationType) {
      case 'add':
        return curentTimestamp;
      case 'edit':
        return recordTimestamp;
      default:
        return curentTimestamp;
    }
  };

  const waterPortion = (operationType) => {
    switch (operationType) {
      case 'add':
        return 50;
      case 'edit':
        return water.amount;
      default:
        return 50;
    }
  };

  const waterID = (operationType) => {
    switch (operationType) {
      case 'add':
        return null;
      case 'edit':
        return water.id;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`${css.overlay} ${isVisible ? css.visible : ''}`}
        onClick={handleClose}
      />
      <div className={`${css.WaterModal} ${isVisible ? css.visible : ''}`}>
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
          className={css.WaterModalCloseBtn}
        >
          <svg>
            <use xlinkHref={svgSprite + '#icon-clear'} />
          </svg>
        </button>
      </div>
    </>
  );
};

export default WaterModal;
