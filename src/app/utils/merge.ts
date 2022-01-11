type Indexed<T = unknown> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const obj: Indexed = { ...lhs };
  Object.keys(rhs).forEach((key) => {
    if (isObject(rhs[key])) {
      if (!(key in lhs)) Object.assign(obj, { [key]: rhs[key] });
      else obj[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
    } else {
      Object.assign(obj, { [key]: rhs[key] });
    }
  });
  return obj;
}

function isObject(item: Indexed | unknown) {
  return (typeof item === 'object' && !Array.isArray(item));
}
