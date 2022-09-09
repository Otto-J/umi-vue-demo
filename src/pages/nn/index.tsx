import { defineComponent } from 'vue';
import './index.less';
export default defineComponent({
  name: 'setupComp',
  props: {
    value: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  setup(props, { emit }) {
    return () => {
      return <div>{props.value}</div>;
    };
  },
});
