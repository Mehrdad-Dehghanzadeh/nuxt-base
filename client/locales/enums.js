import { deepFreeze } from '@helpers/object'

/**
 * Ticket Status
 * **********************************/
const ticketStatus = deepFreeze([
  {
    id: 'pending',
    title: 'در حال انتظار',
    color: 'info'
  },
  {
    id: 'answered',
    title: 'پاسخ داده',
    color: 'success'
  },
  {
    id: 'closed',
    title: 'بسته',
    color: 'error'
  }
])

/**
 * Active Status
 * ***********************************/
const activeStatus = deepFreeze([
  {
    id: true,
    title: 'فعال',
    color: 'success'
  },
  {
    id: false,
    title: 'غیرفعال',
    color: 'error'
  }
])

export default {
  ticketStatus,
  activeStatus
}
