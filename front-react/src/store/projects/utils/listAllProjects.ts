import { ApiError, AuthorizedService } from "@awex-api";
import { AppProject } from "src/types";

export async function listAllProjects() {
  const projects: Record<string, AppProject> = {};

  let i = 1;
  while (true) {
    // server response is invalid
    const nextPage = await AuthorizedService.projectsList(i.toString());
    if (!nextPage.list) {
      break;
    }

    const idListRaw = nextPage.list as unknown;

    const idList: string[] = [];
    if (idListRaw instanceof Array) {
      for (const listItem of idListRaw) {
        if (
          typeof listItem === "object" &&
          listItem !== null &&
          typeof listItem.id === "number"
        ) {
          idList.push(listItem.id.toString());
        }
      }
    }

    for (const id of idList) {
      let projectAndDraftRaw;
      try {
        projectAndDraftRaw = await AuthorizedService.projectGet(id);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          continue;
        }
        throw error;
      }
      let projectAndDraft: any = projectAndDraftRaw;
      if (typeof projectAndDraft !== "object" || projectAndDraft === null) {
        continue;
      }
      if (typeof projectAndDraft.draft !== "object") {
        continue;
      }
      if (typeof projectAndDraft.data !== "object") {
        continue;
      }
      const { data, draft } = projectAndDraft;
      if (draft) {
        projects[id] = draft;
      } else {
        projects[id] = data;
      }
    }

    i++;
    if (nextPage.pages === undefined || nextPage.pages < i) {
      break;
    }
  }

  return projects;
}
