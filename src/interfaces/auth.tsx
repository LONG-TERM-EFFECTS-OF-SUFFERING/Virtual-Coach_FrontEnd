import { AppDispatch } from "../store/store";

export type LoginType = (email: string, password: string) => (dispatch: AppDispatch) => Promise<void>;
