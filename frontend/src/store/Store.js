import { create } from "zustand";
import { devtools } from "zustand/middleware";
import AuthStore from "./AuthStore";
import PostStore from "./PostStore";
import LoaderStore from "./LoaderStore"

const useBoundStore = create()(
  devtools((...a) => ({
    ...PostStore(...a),
    ...AuthStore(...a),
    ...LoaderStore(...a),
  }))
);
export default useBoundStore;
