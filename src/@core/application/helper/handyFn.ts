export const getSearchParams = (params: any) => {
  const newArr: any = [];
  let newObj: any = {};

  params.forEach((value: string, key: string) => {
    newArr.push({ [key]: value });
  });

  newArr.forEach((value: any) => {
    Object.assign(newObj, value);
  });

  return { newObj, newArr };
};
