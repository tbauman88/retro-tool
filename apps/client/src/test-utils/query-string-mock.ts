export const parse = (str: string) => {
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(str);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export const stringify = (obj: Record<string, string>) => {
  return new URLSearchParams(obj).toString();
};

export default { parse, stringify };
