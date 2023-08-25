import React, { useEffect } from "react";
import { PropsWithChildren } from "react";
import { Sidebar } from "../../components/Sidebar";
import { SidebarMobile } from "../../components/SidebarMobile";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getProjects } from "@store/projects/slice";

type UserAreaLayoutProps = PropsWithChildren<{}>;

export function UserAreaLayout(props: UserAreaLayoutProps) {
  const dispatch = useAppDispatch();
  const { data: projects } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const userName = "Ivan Ivanov";

  const handleLogout = () => {
    alert("NOT IMPLEMENTED!");
  };

  return (
    <main className="main main--grid">
      <Sidebar
        userName={userName}
        onLogout={handleLogout}
        projects={projects || {}}
      />
      <SidebarMobile
        userName={userName}
        onLogout={handleLogout}
        projects={projects || {}}
      />
      <div className="wrapper">
        <Outlet />
      </div>
    </main>
  );
}
