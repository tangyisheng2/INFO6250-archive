export function isValidUsername(username) {
  return username && /^[a-z0-9]+$/.test(username) && username !== "dog";
}
