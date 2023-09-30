import { ApiError, AuthorizedService, Project } from "@awex-api";

export async function listAllCompanies(): Promise<Record<string, string>> {
  const companies: Record<string, string> = {};

  let i = 1;
  while (true) {
    const nextPage = await AuthorizedService.companiesList(i.toString());
    if (!nextPage.list) {
      break;
    }

    for (const listItem of nextPage.list) {
      const companyId = listItem.id;
      const companyName = (listItem as any).data?.companyName;
      if (typeof companyId === "number" && typeof companyName === "string") {
        companies[companyId] = companyName;
      }
    }

    i++;
    if (nextPage.pages === undefined || nextPage.pages < i) {
      break;
    }
  }

  return companies;
}
