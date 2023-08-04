import React from "react";
import { PropsWithChildren } from "react";
import { Sidebar } from "../../components/Sidebar";
import { SidebarMobile } from "../../components/SidebarMobile";

type UserAreaLayoutProps = PropsWithChildren<{}>;

export function UserAreaLayout(props: UserAreaLayoutProps) {
  const userName = "Ivan Ivanov";

  const handleLogout = () => {
    alert("Logout!");
  };

  return (
    <main className="main main--grid">
      <Sidebar userName={userName} onLogout={handleLogout} />
      <SidebarMobile userName={userName} onLogout={handleLogout} />
      <div className="wrapper">{props.children}</div>
    </main>
  );
}
