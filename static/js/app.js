//地图容器
var chart = echarts.init(document.getElementById('main'));
//34个省、市、自治区的名字拼音映射数组
var provinces = {
    //23个省
    "台湾": "taiwan",
    "河北": "hebei",
    "山西": "shanxi",
    "辽宁": "liaoning",
    "吉林": "jilin",
    "黑龙江": "heilongjiang",
    "江苏": "jiangsu",
    "浙江": "zhejiang",
    "安徽": "anhui",
    "福建": "fujian",
    "江西": "jiangxi",
    "山东": "shandong",
    "河南": "henan",
    "湖北": "hubei",
    "湖南": "hunan",
    "广东": "guangdong",
    "海南": "hainan",
    "四川": "sichuan",
    "贵州": "guizhou",
    "云南": "yunnan",
    "陕西": "shanxi1",
    "甘肃": "gansu",
    "青海": "qinghai",
    //5个自治区
    "新疆": "xinjiang",
    "广西": "guangxi",
    "内蒙古": "neimenggu",
    "宁夏": "ningxia",
    "西藏": "xizang",
    //4个直辖市
    "北京": "beijing",
    "天津": "tianjin",
    "上海": "shanghai",
    "重庆": "chongqing",
    //2个特别行政区
    "香港": "xianggang",
    "澳门": "aomen"
};
// 数据
var red1=[{name:'安徽',value:8},{name:'北京',value:4},{name:'福建',value:10},{name:'甘肃',value:2},
    {name:'广东',value:24},{name:'广西',value:5},
    {name:'广州市',value:4,sub:2},{name:'深圳市',value:4,sub:2},{name:'佛山市',value:3,sub:2},{name:'中山市',value:3,sub:2},
    {name:'汕头市',value:2,sub:2},{name:'湛江市',value:1,sub:2},{name:'江门市',value:1,sub:2},{name:'东莞市',value:2,sub:2},
    {name:'珠海市',value:2,sub:2},{name:'茂名市',value:1,sub:2},{name:'梅州市',value:1,sub:2}
]
var redColor=['#D9D9D9','#F3BCC6','#E8534D','#B63032']//['#B63032','#E8534D','#F3BCC6','#D9D9D9'];
var piecesProvince=[{gte: 25, lte: 33},{gte: 17, lte: 24},{gte: 9, lte: 16},{gte: 1, lte: 8}]
var piecesCity=[{gte: 4, lte: 4},{gte: 3, lte: 3},{gte: 2, lte: 2},{gte: 1, lte: 1}]


//直辖市和特别行政区-只有二级地图，没有三级地图
var special = ["北京","天津","上海","重庆","香港","澳门"];
var mapdata = [];
//绘制全国地图
$.getJSON('static/map/china.json', function(data){
	d = [];
	for( var i=0;i<data.features.length;i++ ){
		d.push({
			name:data.features[i].properties.name
		})
	}
	mapdata = d;
	//注册地图
	echarts.registerMap('china', data);
	//绘制地图
	renderMap('china',d);
});

//地图点击事件
chart.on('click', function (params) {
	console.log( params );
	if( params.name in provinces ){
		//如果点击的是34个省、市、自治区，绘制选中地区的二级地图
		$.getJSON('static/map/province/'+ provinces[params.name] +'.json', function(data){
		    console.log(data,'=data =69')
			echarts.registerMap( params.name, data);
			var d = [];
			for( var i=0;i<data.features.length;i++ ){
				d.push({
					name:data.features[i].properties.name
				})
			}
			renderMap(params.name,d);
		});
	}else if( params.seriesName in provinces ){
		//如果是【直辖市/特别行政区】只有二级下钻
		if(  special.indexOf( params.seriesName ) >=0  ){
			renderMap('china',mapdata);
		}else{
			//显示县级地图
			$.getJSON('static/map/city/'+ cityMap[params.name] +'.json', function(data){
				echarts.registerMap( params.name, data);
				var d = [];
				for( var i=0;i<data.features.length;i++ ){
					d.push({
						name:data.features[i].properties.name
					})
				}
				renderMap(params.name,d);
			});	
		}	
	}else{
		renderMap('china',mapdata);
	}
});

//初始化绘制全国地图配置
var option = {
	backgroundColor: '#000',
    title : {
        text: 'Echarts3 中国地图下钻至县级',
        subtext: '三级下钻',
        link:'http://www.ldsun.com',
        left: 'center',
        textStyle:{
            color: '#fff',
            fontSize:16,
            fontWeight:'normal',
            fontFamily:"Microsoft YaHei"
        },
        subtextStyle:{
        	color: '#ccc',
            fontSize:13,
            fontWeight:'normal',
            fontFamily:"Microsoft YaHei"
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}'
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        },
        iconStyle:{
        	normal:{
        		color:'#fff'
        	}
        }
    },
    animationDuration:1000,
	animationEasing:'cubicOut',
	animationDurationUpdate:1000,
    visualMap: {
        pieces:piecesProvince,
        right: '20',
        top: 'bottom',
        text: ['高', '低'],
        calculable: false,
        orient: 'vertical',
        type: 'piecewise' ,
        inRange: {
            color: redColor,
        },
    },
     
};
function renderMap(map,data){
    console.log(data,'=data in =161')
	option.title.subtext = map;
    option.series = [ 
		{
            name: map,
            type: 'map',
            mapType: map,
            roam: false,
            nameMap:{
			    'china':'中国'
			},
            label: {
	            normal:{
					show:true,
					textStyle:{
						color:'#999',
						fontSize:13
					}  
	            },
	            emphasis: {
	                show: true,
	                textStyle:{
						color:'#fff',
						fontSize:13
					}
	            }
	        },
	        itemStyle: {
	            normal: {
	                areaColor: '#323c48',
	                borderColor: 'dodgerblue'
	            },
	            emphasis: {
	                areaColor: 'darkorange'
	            }
	        },
            data:data.map(el=>{
                const r=red1.find(v=>v.name===el.name)
                console.log(r,'=r209')
                return {...el,...r}
            })
        }	
    ];
    //渲染地图
    chart.setOption(option);
}
