import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import type { User } from "@/types/user";

const initialState: User = {} as User;

export const userData = createModel<RootModel>()({
  state: initialState,
  reducers: {
    changeUserData(state, payload: any) {
      return { ...state, ...payload };
    },
    removeUser() {
      return initialState;
    },
  },
  effects: (dispatch) => ({
    async setUserAndLogin(payload: any) {
      dispatch.userData.changeUserData(payload);

      await dispatch.auth.fullLogin();
    },
  }),
});
