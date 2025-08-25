import {
  init,
  type RematchDispatch,
  type RematchRootState,
} from "@rematch/core";
import createPersistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import { models, type RootModel } from "./models";

const persistPlugin: any = createPersistPlugin({
  key: "root",
  storage,
  version: 2,
  whitelist: ["auth", "userData"],
});

const middlewares: any = [];
const enhancers: any = [];

export const store = init({
  models,
  redux: {
    middlewares,
    enhancers,
    rootReducers: { RESET_APP: () => undefined },
  },
  plugins: [persistPlugin],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export const { dispatch } = store;
export const { getState } = store;
