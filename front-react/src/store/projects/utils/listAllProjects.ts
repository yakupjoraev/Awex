import { ApiError, AuthorizedService } from "@awex-api"
import { AppProject } from "src/types"

export async function listAllProjects() {
  const idToProject = new Map<string, AppProject>()

  let i = 1
  while (true) { // server response is invalid
    const nextPage = await AuthorizedService.projectsList(i.toString())

    if (!nextPage.list)  break
    const idListRaw = nextPage.list as unknown
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

    for (const id of idList) {
      let projectAndDraftRaw

      try {
        projectAndDraftRaw = await AuthorizedService.projectGet(id)
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) continue
        throw error
      }
      let projectAndDraft: any = projectAndDraftRaw

      if (typeof projectAndDraft !== "object" || projectAndDraft === null) continue
      if (typeof projectAndDraft.draft !== "object") continue
      if (typeof projectAndDraft.data !== "object") continue
      const { data, draft, companyId, validationRequestedAt, validation } = projectAndDraft
      let project: AppProject 

      if (draft) {
        project = { ...draft, companyId, validationRequestedAt, validation }
        idToProject.set(id, project)
      } else {
        project = { ...data, companyId, validationRequestedAt, validation }
        idToProject.set(id, project)
      }
    }

    i++

    if (nextPage.pages === undefined || nextPage.pages < i) break
  }

  const projects: { id: string; project: AppProject }[] = Array.from(
    idToProject.entries()
  ).map(([id, project]) => ({ id, project }))

  return projects
}