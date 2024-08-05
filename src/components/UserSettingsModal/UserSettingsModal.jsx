import React from 'react'
import css from './UserSettingsModal.module.css'
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm'

function UserSettingsModal() {
    return (
      <div className={css.settingsModal}>
        <h2 className={css.settingsModalTitle}>Settings</h2>
        <UserSettingsForm />
      </div>
    );
}

export default UserSettingsModal