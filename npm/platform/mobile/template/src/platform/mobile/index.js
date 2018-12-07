//mobile平台特有代码
console.warn("platform:mobile");
import Vue from "vue";
import {
    //Style,
    Toast,
    Picker,
    DatePicker,
    CheckboxGroup,
    Checkbox,
    RadioGroup,
    Radio,
    Dialog,
    Swipe
  } from "cube-ui";
  Vue.use(Toast);
  Vue.use(Picker);
  Vue.use(DatePicker);
  Vue.use(CheckboxGroup);
  Vue.use(Checkbox);
  Vue.use(RadioGroup);
  Vue.use(Radio);
  Vue.use(Dialog);
  Vue.use(Swipe);