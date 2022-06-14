Vue.config.debug = true;
new Vue({
    el: '#my-app',
    data: {
        mapDate: [
            {
                name: '昌平区',
                value: 2299,
                sort: 1
            },
            {
                name: '西城区',
                value: 3000,
                sort: 2
            },
            {
                name: '密云区',
                value: 3000,
                sort: 2
            },
            {
                name: '延庆区',
                value: 3000,
                sort: 2
            },
            {
                name: '怀柔区',
                value: 3000,
                sort: 2
            },
            {
                name: '房山区',
                value: 3000,
                sort: 2
            },
            {
                name: '顺义区',
                value: 3000,
                sort: 2
            },
            {
                name: '大兴区',
                value: 3000,
                sort: 2
            },
        ],
        mapData: [
            {
                name: '昌平区',
                value: 2299,
                sort: 1
            },
            {
                name: '西城区',
                value: 5000,
                sort: 2
            },
            {
                name: '怀柔区',
                value: 1000,
                sort: 2
            },
            {
                name: '房山区',
                value: 3000,
                sort: 2
            },
            {
                name: '顺义区',
                value: 1000,
                sort: 2
            },
            {
                name: '延庆区',
                value: 3000,
                sort: 2
            },
        ],
        mapname: {},
        geoCoordMap: {},
        xq:"全国",
        myChart:false,
        mapSource:"全国",
        date:""
    },
    components: {
        "swich-tab": httpVueLoader('./swichTab.vue'),
    },
    methods: {

        //tab切换回调
        selectEvent (data) {
            console.log(data)
            this.mapSource = '北京'
            this.mapInit(1,1111)
        },

        //绘制地图
        mapInit (minValue, maxValue) {
            let _this = this;
            _this.myChart && _this.myChart.clear()
            let $mapCharts = $('#map');
            $mapCharts.css({
                height: 250,
            });
            myChart = echarts.init($mapCharts.get(0));
            $.getJSON('./province.json', data => {
                _this.mapname = data[_this.mapSource];
                _this.geoCoordMap = _this.getGeoCoordMap(_this.mapDate, _this.mapname);
                echarts.registerMap(_this.xq, _this.mapname);
                option = {
                    tooltip: {
                        confine: true,
                        show: false,
                    },
                    grid: {
                        top: "20%",
                        bottom: "30%", //距离下边距
                    },
                    visualMap: {
                        min: 0,
                        max: 10000,
                        show: false,
                        text: ['High', 'Low'],
                        realtime: false,
                        calculable: true,
                        inRange: {
                            color: ['#CDE5F7', '#0169BB'],
                        },
                    },
                    backgroundColor: '#ffffff',
                    geo: {
                        map: _this.xq,
                        roam: false, // 一定要关闭拖拽
                        zoom: 1,
                        // center: [0, 0],
                        label: {
                            normal: {
                                show: false, //省份名展示
                                fontSize: '10',
                                color: 'rgba(0,0,0,0.7)',
                            },
                            emphasis: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#CDE5F7',
                                borderColor: '#CDE5F7',
                                borderWidth: 1,
                            },
                            emphasis: {
                                areaColor: '#CDE5F7',
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 5,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                    visualMap: {
                        min: Math.ceil(minValue),
                        max: Math.ceil(maxValue),
                        show: true,
                        text: [Math.ceil(maxValue) + '  亿元', '0'],
                        orient: 'horizontal',
                        handleIcon: 'none',
                        realtime: true,
                        calculable: false,
                        itemHeight: 60,
                        itemWidth: 8,
                        seriesIndex: [0],
                        left: '3%',
                        bottom: '1%',
                        inRange: {
                            color: ['#CDE5F7', '#9DC8E2', '#0169BB'],
                        },
                    },
                    series: [
                        {
                            type: 'map',
                            roam: true,
                            zoom: 1,
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            },
                            itemStyle: {
                                // 地图区域的多边形 图形样式
                                normal: {
                                    // 图形在默认状态下的样式
                                    areaColor: '#CDE5F7',
                                    borderColor: '#CDE5F7',
                                    borderWidth: 1,
                                },
                                emphasis: {
                                    // 是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                                    areaColor: '#30518d',
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowBlur: 5,
                                    borderWidth: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                },
                            },
                            map: _this.xq,
                            data: _this.mapData,
                        },
                        {
                            name: 'city',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbol: 'image://./biaoji.png',
                            symbolSize: [70, 30],
                            symbolOffset: ["50%", "-60%"],
                            label: {
                                show: true,
                                formatter: function (params) {
                                    if (params.value[2] === 0 || params.value[2] === '') {
                                        return '';
                                    } else {
                                        return `TOP${params.data.sort} ${params.name}`
                                    }
                                },
                                position: "insideTop",
                                textStyle: {
                                    fontSize: 10,
                                    color: '#ffffff',
                                },
                            },
                            z: 99,
                            data: _this.convertData(_this.mapDate),
                        },
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            symbolSize: '5',
                            rippleEffect: {
                                brushType: 'stroke',
                            },
                            itemStyle: {
                                normal: {
                                    color: '#FF7D3C',
                                    shadowBlur: 10,
                                    shadowColor: "#FF7D3C",
                                },
                            },
                            visualMap: false,
                            z: 88,
                            data: _this.convertData(_this.mapDate),
                        },
                    ],
                };
                myChart.setOption(option);
            })

        },

        //转换echarts数据
        convertData (data) {
            let res = [];
            for (let i = 0; i < data.length; i++) {
                let geoCoord = this.geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                        sort: data[i].sort,
                        visualMap: false,
                    });
                }
            }
            return res;
        },

        //转换散点图数据
        getGeoCoordMap (data, mapname) {
            let res = {};
            data.forEach(city => {
                this.mapname.features.forEach((item) => {
                    if (item.properties.name === city.name) {
                        res[city.name] = item.properties.centroid
                    }
                })
            })
            return res;
        },

        //获取客户端辖区
        getClientXq(name){
            this.mapSource = name;
            this.mapInit(1,1111)
        },

        //获取客户端日期
        getClientDate(date){
            this.date = date;
        }
    },
    mounted () {
        this.mapInit(0, 10000);
        window.getClientXq = this.getClientXq;
    },
});

let utils = {
    getNewline (text, fs) {
        let fontSize = fs;
        let maxWidth = window.screen.width - window.screen.width * 0.04;
        let gap = Math.floor(maxWidth / fontSize);
        let textA = text.split('');
        textA.forEach((item, index) => {
            if (index !== 0 && index % gap == 0) {
                textA.splice(index, 0, '\n');
            }
        });
        text = textA.join('');
        return text;
    },
}

