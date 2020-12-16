# uniapp-陶冬来

## 快速开始  

### 安装yarn  

```shell
npm install -g yarn --registry=https://registry.npm.taobao.org
```

#### 换源  

由于外网访问速度很慢，所以需要更换国内镜像资源。  

```sh
yarn config set registry https://registry.npm.taobao.org/
```

### 安装依赖

```shell
yarn
```

### 微信小程序编译

```shell
yarn run dev:mp-weixin
```

### H5编译

```shell
yarn run dev:h5
```

### 微信小程序打包

```shell
yarn run build:mp-weixin
```

### H5打包

```shell
yarn run build:h5
```

### UI框架-uView  

关于uView的问题以及使用方法请参考[官方文档](http://uviewui.com/components/quickstart.html)

### Image的mode属性  

image标签可以配置mode属性，例如：

```html
<image src="../../static/imgs/index/drapTrangle.png" mode="" />
```

取值如下：

* scaleToFill 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
* aspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
* aspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
* widthFix 宽度不变，高度自动变化，保持原图宽高比不变
* heightFix 高度不变，宽度自动变化，保持原图宽高比不变 App 和 H5 平台 HBuilderX 2.9.3+ 支持、微信小程序需要基础库 2.10.3

### api使用  

api列表在src/api,已经按模块分类。
在main.js中全局挂载  

```JavaScript  
Vue.prototype.$api = API
```  

使用方式一:  

```JavaScript
this.$api.接口名({params}).then(res => {
    //你的操作
})
```  

使用方式二:  

使用async/await,注意await只能使用在async函数中  

```JavaScript  
async test() {
    let res = await this.$api.接口名({params})
}
```  

接口文件命名为 xx(模块名).api.js，例如: user.api.js

### throttle & debounce节流防抖  

节流防抖函数已经在uview中集成,使用方式[在此](http://uviewui.com/js/debounce.html)

### 深拷贝  

深拷贝函数已经在uview中集成，使用方式[在此](http://uviewui.com/js/deepClone.html)

### 浮点数计算  

为了避免出现 0.1 + 0.2 !== 0.3,所以必须使用封装后的浮点数计算方法  

#### 使用方式  

首先安装  

```shell
yarn add number-precision --registry=https://registry.npm.taobao.org
```

引入  

```js
import NP from 'number-precision'
```

API列表

```JavaScript  
this.$np.strip(0.09999999999999998); // = 0.1
this.$np.plus(0.1, 0.2);             // = 0.3, not 0.30000000000000004
this.$np.plus(2.3, 2.4);             // = 4.7, not 4.699999999999999
this.$np.minus(1.0, 0.9);            // = 0.1, not 0.09999999999999998
this.$np.times(3, 0.3);              // = 0.9, not 0.8999999999999999
this.$np.times(0.362, 100);          // = 36.2, not 36.199999999999996
this.$np.divide(1.21, 1.1);          // = 1.1, not 1.0999999999999999
this.$np.round(0.105, 2);            // = 0.11, not 0.1
```

### vuex

vuex做了一些封装,主要是应对以下问题：

* 我们需要在`vuex`中定义`state`和`mutations`
* 我们需要在每个用到`vuex`变量的地方，都引入`mapState`，同时还要解构到`computed`中去
* 修改`vuex`变量的时候，还需要通过`commit`提交
* 由于`vuex`变量是保存在运行内存中的，H5中刷新浏览器`vuex`变量会消失，还需要通过其他手段实现变量的存续

首先对于要保存到localStorage的变量统一写入到数组saveStateKeys中，同时，在state中也需要写上lifeData.xxx ? lifeData.xxx : yyy的形式。  

```js
let lifeData = {};

try{
 // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
 lifeData = uni.getStorageSync('lifeData');
}catch(e){

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token'];

//state  
state: {
    // 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
    // 加上vuex_前缀，是防止变量名冲突，也让人一目了然
    vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {name: '明月'},
    vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
},
```

使用时，如果是读取数据就使用`this.vuex_user`这种形式，如果是修改数据就使用`this.$u.vuex('vuex_user', res.data)`这种形式
# uni-taodonglai
