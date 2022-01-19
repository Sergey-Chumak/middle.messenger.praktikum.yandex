interface IObject {
  [key: string]: any
}

type TIsEqualArg = string | number | boolean | Array<any> | IObject

export default function isEqual(arg: TIsEqualArg, arg2: TIsEqualArg): boolean {
  if (typeof arg !== typeof arg2) return false;
  if (typeof arg === 'string' || typeof arg === 'number' || typeof arg === 'boolean') return arg === arg2;
  if (Array.isArray(arg)) return isEqualArray(arg, arg2 as typeof arg);
  return isEqualObjects(arg as IObject, arg2 as IObject);
}

function isEqualArray(arg: Array<any>, arg2: typeof arg): boolean {
  if (arg === arg2) return true;
  if (arg.length !== arg2.length) return false;
  for (let i = 0; i <= arg.length; i += 1) {
    if (Array.isArray(arg[i])) {
      if (!isEqualArray(arg[i], arg2[i])) return false;
    } else if (typeof arg[i] === 'object') {
      if (!isEqualObjects(arg[i], arg2[i])) return false;
    } else if (arg[i] !== arg2[i]) return false;
  }
  return true;
}

function isEqualObjects(arg: IObject, arg2: typeof arg): boolean {
  if (!arg || !arg2) return arg2 === arg;
  if (typeof arg === 'function') return false;
  if (arg === arg2) return true;
  if (Object.keys(arg).length !== Object.keys(arg2).length) return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const prop in arg) {
    if (arg.hasOwnProperty(prop)) {
      if (typeof arg[prop] === 'object') {
        if (!isEqualObjects(arg[prop], arg2[prop])) {
          return false;
        }
      } else if (arg[prop] !== arg2[prop]) {
        return false;
      }
    }
  }

  return true;
}
