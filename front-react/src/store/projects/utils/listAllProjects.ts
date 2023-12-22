import { ApiError, AuthorizedService } from "@awex-api"
import { AppProject } from "src/types"

interface Project { id: string; project: AppProject }

export async function listAllProjects() {
  const idToProject = new Map<string, AppProject>()

  let i = 1
  while (true) {
    const nextPage = await AuthorizedService.projectsList(i.toString())

    if (!nextPage.list)  break
    const idListRaw = nextPage.list
    const idList: string[] = []

    if (idListRaw instanceof Array) {
      for (const listItem of idListRaw) {
        if (
          typeof listItem === "object" &&
          listItem !== null &&
          typeof listItem.id === "number"
        ) {
          idList.push(listItem.id.toString())
        }
      }
    }

    idListRaw.forEach((projectItem) => {
      if ((typeof projectItem !== "object" || projectItem === null) ||
          (typeof projectItem.draft !== "object") ||
          (typeof projectItem.data !== "object") ||
          (projectItem.id === undefined)
      ) return
      const { id, data, draft, companyId, validationRequestedAt, validation } = projectItem
      let project: AppProject 

      if (draft) {
        project = { ...draft, companyId, validationRequestedAt, validation }
        idToProject.set(id.toString(), project)
      } else {
        project = { ...data, companyId, validationRequestedAt, validation }
        idToProject.set(id.toString(), project)
      }
    })

    i++

    if (nextPage.pages === undefined || nextPage.pages < i) break
  }

  const projects: Project[] = Array.from(
    idToProject.entries()
  ).map(([id, project]) => ({ id, project }))

  return projects
}