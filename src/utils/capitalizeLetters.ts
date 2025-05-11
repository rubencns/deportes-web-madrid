export const capitalizeFirstLetter = (string: string) => {
  const stringToLowerCase = string?.toLowerCase()
  return stringToLowerCase?.charAt(0).toUpperCase() + stringToLowerCase?.slice(1)
}

export const capitalizeFirstLetterOfEachWord = (string: string = '') => {
  const possibleInitials = ['cb', 'c.b', 'c.b.', 'cd', 'c.d', 'c.d.']

  return string
    ?.split(' ')
    .map((word) => {
      if (possibleInitials.some((initial) => word.toLowerCase() === initial)) {
        return word.toUpperCase()
      }
      return capitalizeFirstLetter(word)
    })
    .join(' ')
}
