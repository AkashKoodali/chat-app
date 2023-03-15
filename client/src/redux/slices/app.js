import { createSlice } from "@reduxjs/toolkit";

//
import { dispatch } from "../store";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARE
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle sidebar
    toggleSideBar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
  },
});

// -- Redux
export default slice.reducer;

// 

export function ToggleSidebar() {
return async () => {
    dispatch(slice.actions.toggleSideBar());
}
}

export function UpdateSidebarType(type) {
    return async () => {
        dispatch(slice.actions.updateSidebarType({
            type
        }));
    }
}
