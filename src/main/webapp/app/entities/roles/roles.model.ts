export interface IRoles {
  id?: number;
  nombreRol?: string | null;
}

export class Roles implements IRoles {
  constructor(public id?: number, public nombreRol?: string | null) {}
}

export function getRolesIdentifier(roles: IRoles): number | undefined {
  return roles.id;
}
