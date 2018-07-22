var map;
var markers = [];

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
	}];

var ViewModel = function() {
	var self = this;
	self.locationList = ko.observableArray(locations);
	self.filter = ko.observable('');
	self.filteredLocation = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		return ko.utils.arrayFilter(self.locationList(), function(location) {
				if(location.title.includes(filter)) {
					//设置点标记的动画效果
					location.marker.setAnimation('AMAP_ANIMATION_DROP');

					location.marker.show();
					return true;
				} else {
					console.log(location.title + 'hide');
					location.marker.hide();
					return false;
				}
		});
	}, this);
	//点击列表中项目显示对应点标记信息窗口
	self.clickList = function(location) {
		populateInfoWindow(location.marker);
		location.marker.setAnimation('AMAP_ANIMATION_DROP');

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
	//创建标记
	addMarkers(locations);
	//使用knockout显示列表并实现筛选功能
	ko.applyBindings(new ViewModel());
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
	var position = marker.getPosition();
	var title = marker.getTitle();

	var infoWindow = new AMap.InfoWindow({
		closeWhenClickMap: true,
		offset: new AMap.Pixel(10, -30)
	});
	infoWindow.open(map, position);
	setContent(infoWindow, title);
}
//设置信息窗口中的内容
function setContent(infoWindow, title) {
	var url = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=西湖' + title + '&Subscription-Key=9fbb3a6ba91b40a19feceb9c1aef77b7';

	$.getJSON(url, function(data) {
		var content;
		var imgUrl = data.value[0].thumbnailUrl;
		content = '<img id="infoImg" src="' + imgUrl + '">';
		infoWindow.setContent(content);
	});
}