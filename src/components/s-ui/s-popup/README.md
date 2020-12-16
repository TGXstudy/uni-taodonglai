# s-popup

## 参数说明

``` js
{
  // class
  customClass: {
    type: String,
    default: ''
  },
  // v-model双向绑定
  value: Boolean,
  // 弹框显示位置 center | left | right | top | bottom
  position: {
    type: String,
    default: 'center'
  },
  // 是否使用过渡效果
  effect: {
    type: Boolean,
    default: true
  },
  // 过渡时间
  effectDuration: {
    type: Number,
    default: 300
  },
  // 是否显示遮罩
  mask: {
    type: Boolean,
    default: true
  },
  // 遮罩透明度
  maskOpacity: {
    type: Number,
    default: 0.7
  },
  // 点击遮罩是否关闭弹框
  maskClose: {
    type: Boolean,
    default: true
  },
  // 自动关闭时间
  duration: {
    type: Number,
    default: 0
  },
  // 是否阻止弹层touchmove滚动，手机上滚动穿透
  preventTouchmove: {
    type: Boolean,
    default: false
  },
  // 显示时拦截钩子返回promise拦截
  beforeShow: Function,
  // 隐藏时拦截钩子返回promise拦截
  beforeHide: Function
}
```

## 使用方式

#### template
``` html
<s-popup custom-class="demo-popup" position="bottom" v-model="visible">
  <!-- 内容 -->
</s-popup>
```

#### script
``` js
import sPopup from '@/s-ui/s-popup';
export default {
  components: {
    sPopup
  },
  data (){
    return {
      visible: true
    }
  }
}
```

#### style
``` css
.demo-popup{
  .s-popup-wrapper{

  }
}
```