var map;
var infoWindow;

var locations = [{
		title: "断桥残雪",
		position: [120.151223, 30.258051]
	},{
		title: "雷峰夕照",
		position: [120.148845,30.231697]
	},{
		title: "花港观鱼",
		position: [120.142141,30.232186]
	},{
		title: "苏堤春晓",
		position: [120.137611,30.243425]
	},{
		title: "三潭映月",
		position: [120.145408,30.238716]
	},{
		title: "曲院风荷",
		position: [120.135502,30.251182]
	},{
		title: "平湖秋月",
		position: [120.146136,30.252205]
	},{
		title: "柳浪闻莺",
		position: [120.158016,30.239323]
	},{
		title: "双峰插云",
		position: [120.122558,30.247494]
	},{
		title: "南屏晚钟",
		position: [120.149073,30.228588]
	}];

var ViewModel = function() {
	var self = this;
	self.locationList = ko.observableArray(locations);
	self.filter = ko.observable('');
	//返回筛选后包含filter的locationList数组
	self.filteredLocation = ko.computed(function() {
		var filter = self.filter().toLowerCase().trim();
		//筛选时关闭打开的信息窗口
		if(infoWindow.getIsOpen()) infoWindow.close();
		return ko.utils.arrayFilter(self.locationList(), function(location) {
				if(location.title.includes(filter)) {
					//根据显示的点标记分布的情况，自动缩放地图到合适的视野级别
					map.setFitView();
					//设置点标记的动画效果
					location.marker.setAnimation('AMAP_ANIMATION_DROP');
					location.marker.show();
					return true;
				} else {
					location.marker.hide();
					return false;
				}
		});
	}, this);
	//点击列表中项目显示对应点标记信息窗口
	self.clickList = function(location) {
		populateInfoWindow(location.marker);

	}
}


//初始函数
function init() {
	var $map = $('#map');
	//创建地图
	map = new AMap.Map($map[0], {
		zoom: 13,
		center: [120.16428, 30.272037]
	});
	infoWindow = new AMap.InfoWindow({
		//closeWhenClickMap: true,
		offset: new AMap.Pixel(10, -30)
	});
	//创建标记
	addMarkers(locations);
	//使用knockout显示列表并实现筛选功能
	ko.applyBindings(new ViewModel());
}
//map地图加载出错时弹出警告框
function mapErrorHandler() {
	window.alert('Error');
}
//根据locations数组添加点标记
function addMarkers(locations) {
	locations.forEach(function(location) {
		//根据location对象创建点标记
		var marker = new AMap.Marker(location);
		//为点标记指定显示地图
		marker.setMap(map);
		//为点标记添加click事件监听
		marker.on('click', function() {
			populateInfoWindow(marker);
		});
		//将marker与location关联在一起实现点标记的筛选功能
		location.marker = marker;
	});
}

//填充信息窗体
function populateInfoWindow(marker) {
	let position = marker.getPosition();
	let title = marker.getTitle();

	//根据打开点标记地址设置地图中心
	map.setCenter(marker.getPosition());
	//点标记跳动
	marker.setAnimation('AMAP_ANIMATION_DROP');
	//设置信息窗口内容
	setContent(infoWindow, title);
	infoWindow.open(map, position);

}
//设置信息窗口中的内容
function setContent(infoWindow, title) {
	var url = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=西湖' + title + '&Subscription-Key=fc50c63cf57b4c4aab1b1ef9a52aa866';

	$.getJSON(url)
		.done(function(data) {
			var content;
			var imgUrl = data.value[0].thumbnailUrl;

			//var $div = $("<div class='info'></div>");
			var $img = $("<img class='infoImg'>");
			$img.attr("src", imgUrl);

			//$div.append($img);
			content = $img;
			infoWindow.setContent(content[0]);
		})
		.fail(function() {
			alert("出错了！！未能获取Bing搜索内容");
		});
}