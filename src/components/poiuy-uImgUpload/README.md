

插件安装
	
图片上传组件 将组件放在自己的组件库里导入即可

### 注意

1.最好在回调结果后使用debugger看一下结果！

2.请先看一下示范代码。

3.如果有问题和建议可以联系我，也可以自己修改成符合自己项目的。

4.注意，一定要去看看接口的返回值和插件写的返回值是否一样，如果不一样，可以在下面写注释的地方修改。
	
#### 导入：  
> import imgUpload from '@/components/my-components/uImgUpload.vue';

-------------------------------------   

#### 属性 attribute

| 属性名            | 类型     | 介绍          | 默认值              |
|----------------|--------|-------------|------------------|
| imgArr         | Array  | 图片展示列表      | \[\]             |
| uploadImgCount | Number | 一次可选多少张图片   | 3                |
| imgCount       | Number | 一共可以上传多少张图片 | 3                |
| imgSize        | Number | 上传图片的大小     | 2 \(M\)          |
| imgType        | Array  | 能上传图片的类型(注：小程序下不兼容)    | \["jepg","png"\] |
| closeTip        | Boolean  | 是否关闭提示    | false |
| formData       | Object  | 提交时携带数据   | {}  |
| loading        | Boolean  | 是否存在加载动画    | true |
| url        | String  | 上传图片的url (1.1.0版本新增)     | "" |
| async        | Boolean  | 是否选择图片后直接上传 (1.1.0版本新增)    | false |
| header        | Array  | 请求头添加新的属性值 (1.1.1版本新增)    | [] |
| previewMany   | Boolean  | 是否开启多图预览 (1.1.2版本新增)    | false |
| config        | Object  | 配置对象 **已经设置默认值** (1.1.2版本新增)    | {} |
| pressImg   | Number  | 是否开启图片压缩值为-1则不开启，0-100为压缩值 (1.1.3版本新增)    | -1 |

------------------------------------- 

>>config对象参数

| 属性名            | 类型     | 介绍          | 默认值              |
|----------------|--------|-------------|------------------|
| delIcon         | String  | 删除图片的icon,使用图片链接       | ""            |
| resultTip | Boolean | 是否显示结果提示   | true                |
| resultType       | String | 结果展示类型 [暂时只存在1] | 1                |
| loadIcon        | String | 加载时的图标     | ""         |
| loadText        | String  | 加载时的文字    | "" |

------------------------------------- 

#### 方法 method

>当**async**为**true**的时候
>存在两个方法

| 方法名    | 介绍                     |
|--------|------------------------|
| result | 上传后的返回结果\(成功对象\)       |
| delImg | 删除图片返回下标\(传入的图片数组的下标\) |


>开始上传图片 在父页面中调用该方法（当async为false,也就是默认值的时候使用）
> *注意* 一定要给组件 **ref="imgUpload"**

-------------------------------------

####示范代码

```

<template>
<!--里面一些属性是示范作用才写上去的，具体需要使用哪些属性可自由调整-->
<imgUpload config:"config" previewMany :imgArr="imgArray" loading async url="xxx(上传图片的url)" @result="resultUrl" @delImg="delImg"></imgUpload>
<imgUpload :imgArr="imgArray" imgCount="9" ref="imgUpload" url="xxx(上传图片的url)"></imgUpload>
<button type="default" @click="submit">提交</button>
</template>

<script>
	import imgUpload from '@/components/my-components/imgUpload.vue';
	export default {
		components: {
			imgUpload
		},
		data() {
			return {
				imgArray:[],
				head:[{token:"zx6c54asdq89w7eqw6e46ad4"},{sign:'s6d5a4dqwe7q9w87a6'}],  //示范格式 JSON   使用方式header="head"
				config:{
						delIcon: '', //删除图片icon
						resultTip: true, //结果提示
						resultType:'1', //结果展示类型
						loadIcon: '', //加载时的图标
						loadText: ''  //加载时的文字
					}
			}
		},
		methods: {
		  submit(){
			 //开始上传图片
           this.$refs.imgUpload.upload(res=>{
			   if(res.code==0){
			   		//0为正常返回，将回调的线上图片数组 赋值给需要提交的表单里
					//res.urlArray 线上路径图片数组对象
					//TODO
				}else{
					//用户没有上传图片的返回 code码为400
				}

				//可以在下面继续写提交代码
		   });
	},
	resultUrl(e){
				console.log(e);
				//成功默认为0
				if(e.code==0){
					this.imgArr.push(e.fileVo.fileUrl);
				}
	},
	delImg(e){
		this.imgArr.splice(e,1) //为删除图片数组的下标
	}
}
</script>

```


-------------------------------------

###[彩蛋提示]
可以在组件里修改组件小提示的颜色哦！只需要修改成功失败警告的颜色即可。

```
tipObj: {
					prompt: '',
					typeColor: '#009100',
					success: '#009100', //成功-#009100; 可自定义修改
					warning: '#d3d300', // 警告 -#d3d300; 可自定义修改
					error: '#FF0000' // 失败--#FF0000; 可自定义修改
				},

```
 
	



	