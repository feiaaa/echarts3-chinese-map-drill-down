//地图容器
var chart = echarts.init(document.getElementById('main'));
//34个省、市、自治区的名字拼音映射数组
var provinces = {
    //23个
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
var province1=[{name:"江苏",value:23},{name:"山东",value:21},{name:"广东",value:16},{name:"浙江",value:15},
    {name:"河南",value:12},{name:"河北",value:8},{name:"安徽",value:7},{name:"福建",value:7},{name:"江西",value:6},
    {name:"辽宁",value:6},{name:"广西",value:4},{name:"黑龙江",value:4},
    {name:"吉林",value:4},{name:"山西",value:4},{name:"陕西",value:4},
    {name:"云南",value:4},{name:"重庆",value:4},{name:"北京",value:3},{name:"湖北",value:3},{name:"湖南",value:3},
    {name:"上海",value:3},{name:"四川",value:3},{name:"天津",value:3},{name:"新疆",value:3},{name:"甘肃",value:2},
    {name:"贵州",value:2},{name:"宁夏",value:2},{name:"内蒙古",value:1},

    {name:"郑州市",value:4,sub:2},{name:"重庆市",value:4,sub:2},{name:"福州市",value:4,sub:2},
    {name:"济南市",value:4,sub:2},{name:"西安市",value:4,sub:2},{name:"哈尔滨市",value:4,sub:2},
    {name:"长春市",value:4,sub:2},{name:"南昌市",value:4,sub:2},{name:"石家庄市",value:4,sub:2},{name:"太原市",value:4,sub:2},
    {name:"南宁市",value:4,sub:2},{name:"潍坊市",value:4,sub:2},{name:"烟台市",value:4,sub:2},
    {name:"昆明市",value:4,sub:2},{name:"上海市",value:3,sub:2},{name:"杭州市",value:3,sub:2},{name:"成都市",value:3,sub:2},
    {name:"长沙市",value:3,sub:2},{name:"沈阳市",value:3,sub:2},{name:"深圳市",value:3,sub:2},{name:"温州市",value:3,sub:2},
    {name:"宁波市",value:3,sub:2},{name:"金华市",value:3,sub:2},{name:"北京市",value:3,sub:2},{name:"广州市",value:3,sub:2},
    {name:"南京市",value:3,sub:2},{name:"武汉市",value:3,sub:2},{name:"青岛市",value:3,sub:2},{name:"天津市",value:3,sub:2},
    {name:"合肥市",value:3,sub:2},{name:"苏州市",value:3,sub:2},{name:"无锡市",value:3,sub:2},{name:"大连市",value:3,sub:2},
    {name:"乌鲁木齐市",value:3,sub:2},{name:"常州市",value:3,sub:2},{name:"南通市",value:3,sub:2},{name:"佛山市",value:3,sub:2},
    {name:"徐州市",value:2,sub:2},{name:"盐城市",value:2,sub:2},{name:"兰州市",value:2,sub:2},{name:"洛阳市",value:2,sub:2},
    {name:"安阳市",value:2,sub:2},{name:"临沂市",value:2,sub:2},{name:"唐山市",value:2,sub:2},{name:"连云港市",value:2,sub:2},
    {name:"贵阳市",value:2,sub:2},{name:"泉州市",value:2,sub:2},{name:"赣州市",value:2,sub:2},{name:"南阳市",value:2,sub:2},
    {name:"汕头市",value:2,sub:2},{name:"蚌埠市",value:2,sub:2},{name:"济宁市",value:2,sub:2},{name:"沧州市",value:2,sub:2},
    {name:"淮安市",value:2,sub:2},{name:"银川市",value:2,sub:2},{name:"湛江市",value:2,sub:2},{name:"江门市",value:2,sub:2},
    {name:"新乡市",value:2,sub:2},{name:"芜湖市",value:2,sub:2},{name:"东营市",value:2,sub:2},
    {name:"厦门市",value:1,sub:2},{name:"台州市",value:1,sub:2},{name:"绍兴市",value:1,sub:2},{name:"中山市",value:1,sub:2},
    {name:"呼和浩特市",value:1,sub:2},{name:"嘉兴市",value:1,sub:2},{name:"海口市",value:0,sub:2},{name:"保定市",value:0,sub:2},
    {name:"莆田市",value:0,sub:2},{name:"漳州市",value:0,sub:2},{name:"日照市",value:0,sub:2},{name:"淄博市",value:0,sub:2},
    {name:"九江市",value:0,sub:2},{name:"柳州市",value:0,sub:2},{name:"泰安市",value:0,sub:2},{name:"德州市",value:0,sub:2},
    {name:"西宁市",value:0,sub:2},{name:"邯郸市",value:0,sub:2},{name:"桂林市",value:0,sub:2},{name:"茂名市",value:0,sub:2},
    {name:"六安市",value:0,sub:2},{name:"泸州市",value:0,sub:2},
    {name:"威海市",value:0,sub:2},{name:"商丘市",value:0,sub:2},{name:"遵义市",value:0,sub:2},
    {name:"梅州市",value:0,sub:2},{name:"鞍山市",value:0,sub:2},{name:"攀枝花市",value:0,sub:2},{name:"乐山市",value:0,sub:2},
    {name:"长治市",value:0,sub:2},{name:"濮阳市",value:0,sub:2},{name:"南充市",value:0,sub:2},{name:"锦州市",value:0,sub:2},
    {name:"吉林市",value:0,sub:2},{name:"东莞市",value:0,sub:2},{name:"珠海市",value:0,sub:2},{name:"包头市",value:0,sub:2},
    {name:"扬州市",value:0,sub:2},{name:"镇江市",value:0,sub:2},{name:"泰州市",value:0,sub:2},
];
var hospList={
    "蚌埠市":["安徽省蚌埠人民医院","蚌埠医学院第二附属医院","蚌埠医学院第一附属医院"],
    "合肥市":["安徽庐州中西医结合医院","安徽省第二人民医院(黄山路院区)","安徽省立医院(本部)","安徽省立医院(南区)",
        "安徽省胸科医院","安徽省肿瘤医院","安徽医科大学第二附属医院","安徽医科大学第四附属医院","安徽医科大学第一附属医院",
        "安徽医科大学第一附属医院高新院区","安徽医科大学附属巢湖医院","安徽医科大学附属第一医院肥东分院","安徽中医药大学第一附属医院",
        "合肥市第二人民医院广德路院区","合肥市第一人民医院","中国人民解放军联勤保障部队第九0一医院","中国人民武警部队安徽省总队医院",],
    "六安市":["六安市人民医院",],
    "芜湖市":["皖南医学院弋矶山医院","芜湖市第二人民医院","芜湖市第一人民医院",],

}

//未使用的会变色的配置（蓝色，红色）
var redColor=['#D9D9D9','#F3BCC6','#E8534D','#B63032']//['#B63032','#E8534D','#F3BCC6','#D9D9D9'];
var redPiecesProvince=[{gte: 25, lte: 33},{gte: 17, lte: 24},{gte: 9, lte: 16},{gte: 1, lte: 8}]
var redCity=[{gte: 4, lte: 4},{gte: 3, lte: 3},{gte: 2, lte: 2},{gte: 1, lte: 1}]

var blueColor=['#D9D9D9','#A3C1E2','#5E8140','#4274B0','#08205C'];
var bluePiecesProvince=[{gte: 25, lte: 33},{gte: 17, lte: 24},{gte: 9, lte: 16},{gte: 1, lte: 8}]
var blueCity=[{gte: 4, lte: 4},{gte: 3, lte: 3},{gte: 2, lte: 2},{gte: 1, lte: 1}]

// 目前正在使用的紫色
var purpleProvinceColor=['#FEAED5','#FE63AE','#9D004C','#680032'];
var purplePiecesProvince=[{gte: 15},{gte: 7, lte: 14},{gte: 4, lte: 6},{gte: 1, lte: 3}];
var purpleCityColor=['#E7E6E6','#BED7EE','#FEAED5','#FE63AE','#9D004C','#680032'];
var purpleCity=[{gte: 4, lte: 4},{gte: 3, lte: 3},{gte: 2, lte: 2},{gte: 1, lte: 1},{gte: 0, lte: 0},{gte: -1, lte: -1}]


//直辖市和-只有二级地图，没有三级地图
var special = ["北京市","天津市","上海市","重庆市","香港","澳门"];
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
	console.log( params,'=click',option );
	if( params.name in provinces ){
        option.visualMap.inRange.color=purpleCityColor;
        option.visualMap.pieces=purpleCity;
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
        option.visualMap.inRange.color=purpleCityColor;
        option.visualMap.pieces=purpleCity;
		//如果是【直辖市/】只有二级下钻
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
        option.visualMap.inRange.color=purpleProvinceColor;
        option.visualMap.pieces=purplePiecesProvince;
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
        formatter: (params)=>{

            return `${params.data.name}:${params.data.value?params.data.value:'-'}<br/>${params.data.hosp?params.data.hosp.join('<br/>'):''}`
        }
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
        pieces:purplePiecesProvince,
        right: '20',
        top: 'bottom',
        text: ['高', '低'],
        calculable: false,
        orient: 'vertical',
        type: 'piecewise' ,
        inRange: {
            color: purpleProvinceColor,
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
                const r=province1.find(v=>v.name===el.name)
                console.log(r,'=r209')
                if(r && r.sub)r.hosp=hospList[el.name];
                console.log(r,'=r')
                return {...el,...r}
            })
        }	
    ];
    //渲染地图
    chart.setOption(option);
}

// index 按钮操控改变颜色（目前功能不要了）
$('#selectData').change(function(){
    var selectVal=$('#selectData option:selected').val();
    option.visualMap.inRange.color=selectVal=='LC'?blueColor:redColor;
    renderMap('china',mapdata);
});
