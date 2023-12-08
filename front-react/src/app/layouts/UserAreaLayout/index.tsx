import { useEffect } from "react"
import { PropsWithChildren } from "react"
import { Sidebar } from "../../components/Sidebar"
import { SidebarMobile } from "../../components/SidebarMobile"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { getProjects } from "@store/projects/slice"
import { signOut } from "@store/auth/slice"
import { getAccountProfile } from "@store/accountProfile/slice"
import { logOut } from "../../../services/user.service"
import toast from "react-hot-toast"

export function UserAreaLayout() {
  const dispatch = useAppDispatch()
  const { data: projects } = useAppSelector((state) => state.projects)

  const userName = useAppSelector((state) => state.accountProfile.data?.name)

  useEffect(() => {
    dispatch(getAccountProfile())
    dispatch(getProjects())
  }, [dispatch])

  function handleLogout() {
    userlogOut()
    dispatch(signOut())
  }

  async function userlogOut() {
    let rezult = await logOut()
    if(!rezult) {
      toast.error('Не удалось выйти. Проверьте соединение с интернетом или попробуйте позже')
    }
    toast.success('Вы успешно вышли из профиля.')
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
