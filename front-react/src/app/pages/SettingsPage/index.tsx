import React from "react";
import { Routes, Route } from "react-router-dom";
import { SettingsPageLayout } from "./SettingsPageLayout";
import { ProfileTab } from "./ProfileTab";
import { RequisitesTab } from "./RequisitesTab";
import { SafetyTab } from "./SafetyTab";
import { NotificationsTab } from "./NotificationsTab";
import { PermissionManagementTab } from "./PermissionManagementTab";
import { UserAreaLayout } from "../../layouts/UserArea";
import { Helmet } from "react-helmet-async";

export function SettingsPage() {
  return (
    <UserAreaLayout>
      <Helmet title="Настройки" />
      <Routes>
        <Route element={<SettingsPageLayout />}>
          <Route index element={<ProfileTab />} />
          <Route path="requisites" element={<RequisitesTab />} />
          <Route path="safety" element={<SafetyTab />} />
          <Route path="notifications" element={<NotificationsTab />} />
          <Route
            path="permission-management"
            element={<PermissionManagementTab />}
          />
        </Route>
      </Routes>
    </UserAreaLayout>
  );
}
