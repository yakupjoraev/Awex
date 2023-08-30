import { AuthenticatedService, Project } from "@awex-api";

export async function listAllProjects() {
  const projects: Record<string, Project> = {};

  let i = 1;
  while (true) {
    // server response is invalid
    const nextPage = await AuthenticatedService.projectsList(i.toString());
    if (nextPage.list) {
      const normalizedList = nextPage.list as unknown as {
        id: number;
        data: Project | null;
      }[];
      normalizedList.forEach(({ id, data }) => {
        if (data) {
          projects[id.toString()] = data;
        }
      });
    }
    i++;
    if (nextPage.pages === undefined || nextPage.pages < i) {
      break;
    }
  }

  return projects;
}
