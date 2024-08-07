import css from './UserSettingsModal.module.css'
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx'
import Modal from '../Modal/Modal';

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

export default UserSettingsModal