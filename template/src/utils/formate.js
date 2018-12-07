//构造wt-loadmore组件数据工具方法
export function builderLoadMoreData (response) {
  let { data, headers } = response
  let totalNumber = headers['x-total-count']
  return { data, totalNumber }
}