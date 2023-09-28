import { ApiError, AuthorizedService, TeamMember } from "@awex-api";

export async function listAllTeamMembers() {
  const teamMembers: (TeamMember & { id: string })[] = [];

  let i = 1;
  while (true) {
    // server response is invalid
    const nextPage = await AuthorizedService.teamMembersList(i.toString());
    if (!nextPage.list) {
      continue;
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
      let teamMember;
      try {
        teamMember = await AuthorizedService.teamMemberGet(id);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          continue;
        }
        throw error;
      }
      teamMembers.push({
        id,
        name: teamMember.name,
        email: teamMember.email,
        permissions: teamMember.permissions,
        label: teamMember.label,
        enabled: teamMember.enabled,
        confirmed_at: teamMember.confirmed_at,
      });
    }

    i++;
    if (nextPage.pages === undefined || nextPage.pages < i) {
      break;
    }
  }

  return teamMembers;
}
