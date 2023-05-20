import { atom } from "recoil";

interface ListAtom {
  id: string | null;
  title: string | null;
}

export const listState = atom({
  key: "listState",
  default: { id: null, title: null } as ListAtom,
});
