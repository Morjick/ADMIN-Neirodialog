export enum OrderStatusEnum {
  done = 'DONE',
  goingTo = 'GOING TO',
  inDelivery = 'IN DELIVERY',
  closed = 'CLOSED',
  hasError = 'HAS ERROR'
}

export interface OrderStatusResult {
  title: string
  color: string
}

export function getStatus (status: OrderStatusEnum): OrderStatusResult {
  if (!status) {
    return {
      title: 'Без статуса',
      color: '#1D1E20',
    }
  }

  if (status === OrderStatusEnum.done) {
    return {
      title: 'Выполнен',
      color: '#34C559',
    }
  }

  if (status === OrderStatusEnum.goingTo) {
    return {
      title: 'Обрабатывается',
      color: '#F2C94C',
    }
  }

  if (status === OrderStatusEnum.inDelivery) {
    return {
      title: 'Доставляется',
      color: '#FF981F',
    }
  }

  if (status === OrderStatusEnum.closed) {
    return {
      title: 'Закрыт',
      color: '#FF981F',
    }
  }

  if (status === OrderStatusEnum.hasError) {
    return {
      title: 'Есть ошибка',
      color: '#ff0000',
    }
  }

  return {
    title: 'Без статуса',
    color: '#1D1E20',
  }
}
