function AMpInit() {
    AMap.load({
            key: '64cd6e4e273edcef081a7328876d09ae', // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ['AMap.Geolocation', 'AMap.Geocoder'] //插件列表
        })
        .then(AMap => {
            const geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
            })
            const geocoder = new AMap.Geocoder()
            geolocation.getCurrentPosition(function (status, result) {
                if (status == 'complete') {
                    onComplete(result)
                } else {
                    onError(result)
                }
            })

            function onComplete(data) {
                let arr = []
                let d = JSON.parse(JSON.stringify(data.position))
                arr.push(d[0], d[1])
                console.log(d)
                geocoder.getAddress(arr, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        console.log(result)
                        // that.poi = result.regeocode.formattedAddress
                    } else {
                        console.log(result)
                    }
                })
            }

            function onError(data) {
                console.log(data)
            }
        })
        .catch(e => {
            console.log(e);
        });
}