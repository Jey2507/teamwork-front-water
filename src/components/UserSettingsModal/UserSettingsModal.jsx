import css from "../UserSettingsModal/UserSettingsModal.module.css";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm.jsx";
import UniversalModal from "../Modal/Modal.jsx";


function UserSettingsModal() {
  return (
    <Modal>
      <div className={css.settingsModal}>
        <h2 className={css.settingsModalTitle}>Settings</h2>
        <UserSettingsForm />
      </div>
    </Modal>
  );
}

export default UserSettingsModal;
