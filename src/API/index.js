export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getProducts = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};

export const getUsers = () => {
  return fetch(`https://dummyjson.com/users`).then((res) => res.json());
};

export const searchUser = (string) => {
  return fetch(`https://dummyjson.com/users/search?q=${string}`).then((res) =>
    res.json()
  );
};
