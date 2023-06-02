import { getProducts } from "API";

export const products = {
  state: {
    listProducts: [],
  }, // initial st Form:Form.useForm(),ate
  reducers: {
    // handle state changes with pure functions
    SET_PRODUCTS: (state, payload) => {
      return {
        ...state,
      };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async getProductAsync() {
      const response = await getProducts();
      dispatch.products.SET_PRODUCTS(response);
    },
  }),
};
