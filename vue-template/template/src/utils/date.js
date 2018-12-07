// 表单工具方法库
import fecha from 'fecha'

fecha.masks = {
  default: 'YYYY.MM.DD HH:mm',
  shortDatetime: 'YYYY-MM-DD HH:mm',
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss',
  month: 'YYYY-MM',
  hour: 'YYYY-MM-DD HH',
  hm: 'HH:mm'
}

const GenderOptions = [
  { key: 'SECRET', value: '保密' },
  { key: 'MALE', value: '男' },
  { key: 'FEMALE', value: '女' }
]

/**
 * 获取性别的选项
 */
export function getGenderOptions () {
  return GenderOptions
}

/**
 * 格式化性别
 * @param {*String or Nunber} code
 */
export function genderFormat (code) {
  switch (String(code)) {
    case '1':
      return '男'
    case '0':
      return '女'
  }
  for (let item of GenderOptions) {
    if (item.key === code) {
      return item.value
    }
  }
  return ''
}

/**
 * 将Date对象转换成unix timestamp
 */
export function dateToTimestamp (date) {
  return Math.round(date.getTime())
}
/**
 * 将unix timestamp转换成Date对象
 * @param {int} timestamp
 */
export function timestampToDate (timestamp) {
  return new Date(timestamp)
}
/**
 * 获取当前时间的unix timestamp
 */
export function getCurrentTimestamp () {
  return dateToTimestamp(new Date())
}
/**
 * Convert将指定的date值转换成date对象，可以接受timestamp、string或者date
 */

export function toDate (dateObject) {
  let date = null
  if (dateObject instanceof Date) {
    date = dateObject
  } else if (typeof dateObject === 'string') {
    date = new Date(dateObject)
  } else if (typeof dateObject === 'number') {
    if (dateObject === 0) {
      date = null
    } else {
      date = timestampToDate(dateObject)
    }
  }
  return date
}
/**
 * 将unix timestamp或者Date对象格式化成用于前端显示的字符串
 * 可选的格式:
 * 'default' - 'YYYY-MM-DD HH:mm:ss'
 * 'shortDatetime' - 'YYYY-MM-DD HH:mm'
 * 'date' - 'YYYY-MM-DD'
 * 'time' - 'HH:mm:ss'
 */
export function formatDateObject (dateObject, format = 'default') {
  if (!dateObject) {
    // console.warn('toData 方法必须接受一个有效且非空的参数')
    return ''
  }
  let date = toDate(dateObject)
  if (date == null) {
    return ''
  }
  return fecha.format(date, format)
}

/**
 * 格式化时间
 * @param {*Date} now
 */
export function formatDate (now) {
  return formatDateObject(now, 'date')
}

/**
 * 对对象进行深度拷贝
 * @param {*} data
 */
export function deepClone (data) {
  return JSON.parse(JSON.stringify(data))
}

const sampleType = [
  { key: 'OTHER', value: '其他' },
  { key: 'BLOOD', value: '血液' },
  { key: 'BUCCALSWABS', value: '口腔试子' },
  { key: 'TISSUE', value: '组织切片' }
]

/**
 * 获取样本类型
 */
export function getSampleType () {
  return sampleType
}
/**
 * 格式化样本类型
 * @param {*} value
 */
export function formatSampleType (value) {
  for (let item of sampleType) {
    if (item.key === value) {
      return item.value
    }
  }
  return ''
}

const orderStatus = [
  { key: 'ALL', value: '全部订单' },
  { key: 'CREATED', value: '样本交接' },
  { key: 'LAB_SAMPLES_RECEIVED', value: '核酸提取' },
  { key: 'LAB_DNA_READY', value: '上机检测' },
  { key: 'LAB_DNA_TESTED', value: '报告审核' },
  { key: 'REPORT_CHECKED_1ST', value: '报告批准' },
  { key: 'REPORT_CHECKED_2ND', value: '报告盖章' },
  { key: 'REPORT_STAMPED', value: '待完成' },
  { key: 'COMPLETED', value: '已完成' }
]
/**
 * 格式化订单状态用于order-list
 * @param {*} value
 */
export function formatOrderStatus (value) {
  for (let item of orderStatus) {
    if (item.key === value) {
      return item.value
    }
  }
  return ''
}
