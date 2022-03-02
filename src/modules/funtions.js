let list;

export const init = async () => {
  list = [];
};
export const add = async (item) => {
  list.push(item);
};

export const get = async () => list;