// // src/store/slices/authSlice.ts
// import { User } from "@/types/User";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserState {
//   user: User | null;
//   accessToken: string | null;
//   refreshToken: string | null;
// }

// const initialState: UserState = {
//   user: null,
//   accessToken: null,
//   refreshToken: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUserData: (
//       state,
//       action: PayloadAction<{
//         user: User;
//         accessToken: string;
//         refreshToken: string;
//       }>
//     ) => {
//       state.user = action.payload.user;
//       state.accessToken = action.payload.accessToken;
//       state.refreshToken = action.payload.refreshToken;
//     },
//     updateUserData: (state, action: PayloadAction<User | null>) => {
//       state.user = action.payload;
//     },
 
//     logoutUser: (state) => {
//       state.user = null;
//       state.accessToken = null;
//       state.refreshToken = null;
//     },
//   },
// });

// export const { setUserData, updateUserData, logoutUser} = userSlice.actions;
// export default userSlice.reducer;


// src/store/slices/authSlice.ts
import { User } from "@/types/User";
import { Role } from "@/types/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: Role | null; // Added role field
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  role: null, // Initialize role as SUPPLIER for testing
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
        role: Role; // Include role in payload
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
    },
    updateUserData: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      // Update role from user object if available
      state.role = action.payload?.role || null;
    },
    updateUserRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
      // Also update role in user object if user exists
      if (state.user) {
        state.user.role = action.payload;
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null; // Clear role on logout
    },
  },
});

export const { setUserData, updateUserData, updateUserRole, logoutUser } = userSlice.actions;
export default userSlice.reducer;