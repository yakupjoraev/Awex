import React from "react";

export function ProfileTab() {
  const userName = "Ivan Ivanov";

  return (
    <div className="settings__user">
      <img className="settings__user-img" src="/img/sidebar/user.svg" alt="" />

      <div className="settings__user-name">{userName}</div>

      <div className="settings__user-id">(#125445hg55)</div>
    </div>
  );
}
