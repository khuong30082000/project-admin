import { getUsers, searchUser } from "API";

export const users = {
  state: {
    listUsers: [],
  }, // initial st Form:Form.useForm(),ate
  reducers: {
    // handle state changes with pure functions
    SET_USERS: (state, payload) => {
      return {
        ...state,
        listUsers: payload.users.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        }),
      };
    },
    DELETE_USER: (state, payload) => {
      const dataOld = [...state.listUsers];
      const filteredData = dataOld.filter((item) => item.id !== payload);
      return {
        ...state,
        listUsers: filteredData,
      };
    },

    SAVE_USER: (state, payload) => {
      return {
        ...state,
        listUsers: payload,
      };
    },

    SEARCH_USER: (state, payload) => {
      return {
        ...state,
        listUsers: payload.users.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        }),
      };
    },

    ADD_USER: (state, payload) => {
      // c
      const oldData = [...state.listUsers];
      const newData = [...oldData, JSON.parse(payload)];

      return {
        ...state,
        listUsers: newData,
      };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async getUserAsync() {
      const response = await getUsers();
      dispatch.users.SET_USERS(response);
    },

    async searchAsync(string) {
      const response = await searchUser(string);
      dispatch.users.SEARCH_USER(response);
    },
  }),
};
