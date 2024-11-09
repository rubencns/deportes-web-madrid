export const formatDate = (date: string) => {
  const dateObject = new Date(date)

  return Intl.DateTimeFormat("es-ES", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(dateObject)
}
