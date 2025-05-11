import { courtInitials } from '@constants/common'

export const formatCourt = (court: string) => {
  return court.split(courtInitials)[0]
}
