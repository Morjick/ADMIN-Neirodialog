import { getDate } from './getDate'
import { OrderStatusEnum, getStatus, type OrderStatusResult } from './getStatus'

interface StatusItemI {
  title: string
  code: OrderStatusEnum
}

const statuses: StatusItemI[] = [
  {
    title: 'Выполнен',
    code: OrderStatusEnum.done,
  },
  {
    title: 'Обрабатывается',
    code: OrderStatusEnum.goingTo,
  },
  {
    title: 'Доставляется',
    code: OrderStatusEnum.inDelivery,
  },
  {
    title: 'Закрыт',
    code: OrderStatusEnum.closed,
  },
  {
    title: 'Есть ошибка',
    code: OrderStatusEnum.hasError,
  },
]

export {
  getDate,
  getStatus,
  type OrderStatusEnum,
  type OrderStatusResult,
  type StatusItemI,
  statuses
}
