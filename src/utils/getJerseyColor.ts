import { colors } from "@constants/common"

export const getJerseyColorByColorName = (jerseyColor: string) => {
  const color = colors.find((color) =>
    jerseyColor.trim().toLocaleLowerCase().includes(color.name)
  )

  return color?.hex
}