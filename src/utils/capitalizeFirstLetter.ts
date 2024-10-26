export const capitalizeFirstLetter = (string: string) => {
  const stringToLowerCase = string.toLowerCase()
  return stringToLowerCase.charAt(0).toUpperCase() + stringToLowerCase.slice(1)
}
