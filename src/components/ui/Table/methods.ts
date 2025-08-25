const paginatorQuery = (number: any, size: any) => {
  return "page[number]=" + number + "&page[size]=" + size;
};

export { paginatorQuery };
