import css from "../UserSettingsModal/UserSettingsModal.module.css";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm.jsx";
import Modal from "../Modal/Modal";
import Button from "../Button/Button.jsx";

function UserSettingsModal() {
  return (
    <Modal>
      <div className={css.modalContainer}>
        <div className={css.settingsModal}>
          <h2 className={css.settingsModalTitle}>Settings</h2>
          <Button />
          <UserSettingsForm />
        </div>
      </div>
    </Modal>
  );
}

export default UserSettingsModal;
