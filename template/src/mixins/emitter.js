/**
 * 组件隔代通讯工具方法
 * 请尽量避免使用此工具，这会降低代码的可读性
 * 因为，如：祖父组件监听了父组件的某个事件，但该事件却是由孙组件代父组件触发，
 * 该事件的触发逻辑并未在父组件中定义，此时不熟悉的开发人员将受这来路不明的事件困惑，
 * 特别是隔代较多，那么将会给事件的追踪带来极大的麻烦
 */

 //下发事件
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const { name } = child.$options;
    if (name === componentName) {
      child.$emit(...[eventName].concat(params));
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    //向上触发事件
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let { name } = parent.$options;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          ({ name } = parent.$options);
        }
      }
      if (parent) {
        parent.$emit(...[eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
