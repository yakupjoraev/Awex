import { useEffect } from "react"
import { PropsWithChildren } from "react"
import { Sidebar } from "../../components/Sidebar"
import { SidebarMobile } from "../../components/SidebarMobile"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { getProjects } from "@store/projects/slice"
import { signOut } from "@store/auth/slice"
import { getAccountProfile } from "@store/accountProfile/slice"

type UserAreaLayoutProps = PropsWithChildren<{}>;

export function UserAreaLayout(props: UserAreaLayoutProps) {
  const dispatch = useAppDispatch()
  const { data: projects } = useAppSelector((state) => state.projects)

  const userName = useAppSelector((state) => state.accountProfile.data?.name)

  useEffect(() => {
    dispatch(getAccountProfile())
    dispatch(getProjects())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(signOut())
  }

  return (
    <main className="main main--grid">
      <Sidebar
        userName={userName}
        onLogout={handleLogout}
        projects={projects}
      />
      <SidebarMobile
        userName={userName}
        onLogout={handleLogout}
        projects={projects}
      />
      <Outlet />
    </main>
  );
}
