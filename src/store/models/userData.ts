import { createModel } from "@rematch/core";
import type { RootModel } from ".";

interface UserDataState {
  user: any;
}

const initialState: UserDataState = {
  user: null,
};

export const userData = createModel<RootModel>()({
  state: initialState,
  reducers: {
    changeUserData(state, payload: any) {
      return { ...state, user: payload };
    },
    removeUser(state) {
      return { ...state, user: null };
    },
  },
  effects: (dispatch) => ({
    async setUserAndLogin(payload: any) {
      dispatch.userData.changeUserData(payload);

      await dispatch.auth.fullLogin();
    },
  }),
});
