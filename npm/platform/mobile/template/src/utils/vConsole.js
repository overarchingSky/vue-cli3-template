//异步按需引入vConsole，以减小生产环境的js包体积
import { toast } from "utils/toast";
export default {
  contractor: null,
  vm: null,
  load(initStart = false) {
    require(["vconsole"], vConsole => {
      console.log("_this", vConsole);
      this.contractor = vConsole;
      if (initStart) {
        this.start();
      }
    });
  },
  start() {
    if (!this.vm) {
      this.vm = new this.contractor();
      return toast.success("debugger已开启");
    }
    toast.info("debugger已开启，刷新页面关闭");
  },
  close() {}
};
