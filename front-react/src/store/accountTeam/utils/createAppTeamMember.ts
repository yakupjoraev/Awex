import { TeamMember } from "@awex-api";
import { AppTeamMember } from "../slice";

export function createAppTeamMember(
  teamMember: TeamMember & { id: string }
): AppTeamMember {
  return {
    id: teamMember.id,
    name: teamMember.name || "",
    email: teamMember.email,
    permissions: teamMember.permissions || [],
    label: teamMember.label,
    enabled: teamMember.enabled || false,
    confirmed_at: teamMember.confirmed_at || null,
  };
}
