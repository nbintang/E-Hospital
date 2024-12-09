export function capitalizeStr(str: string) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
  }
  