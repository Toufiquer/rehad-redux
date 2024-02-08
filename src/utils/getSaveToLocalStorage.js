const getSaveToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export default getSaveToLocalStorage;
export const clearLocalStorage = () => localStorage.clear();
