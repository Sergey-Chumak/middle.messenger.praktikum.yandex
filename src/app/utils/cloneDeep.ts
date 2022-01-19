interface IObject {
    [key: string]: any
}

const isObject = <T = Record<string, unknown>>(value: unknown): value is T => !!value && typeof value === 'object' && value.toString() === '[object Object]';

export function cloneDeep(obj: IObject | IObject[]): IObject | IObject[] {
  let copyObj;
  if (Array.isArray(obj)) {
    copyObj = cloneArray(obj);
  } else {
    copyObj = cloneObject(obj);
  }
  return copyObj;
}

function cloneArray(arg: Array<any>): typeof arg {
  const cloneArg = [];
  for (let i = 0; i < arg.length; i += 1) {
    if (Array.isArray(arg[i])) {
      cloneArg[i] = cloneArray(arg[i]);
    } else if (isObject(arg[i])) {
      cloneArg[i] = cloneObject(arg[i]);
    } else {
      cloneArg[i] = arg[i];
    }
  }
  return cloneArg;
}

function cloneObject(arg: IObject): typeof arg {
  const cloneArg: IObject = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in arg) {
    if (arg.hasOwnProperty(key)) {
      if (Array.isArray(arg[key])) {
        cloneArg[key] = cloneArray(arg[key]);
      } else if (isObject(arg[key])) {
        cloneArg[key] = cloneObject(arg[key]);
      } else {
        cloneArg[key] = arg[key];
      }
    }
  }
  return cloneArg;
}
