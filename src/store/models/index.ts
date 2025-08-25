import type { Models } from "@rematch/core";
import { auth } from "./auth";
import { userData } from "./userData";
export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
  userData: typeof userData;
}

export const models: RootModel = { auth, userData };
