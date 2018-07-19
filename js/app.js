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
					console.log(location.title + 'show');
					location.marker.show();
					return true;
				} else {
					console.log(location.title + 'hide');
					location.marker.hide();
					return false;
				}
		});
	}, this);
}



function init() {
	//创建地图
	map = new AMap.Map(document.getElementById('map'), {
		zoom: 13,
		center: [120.16428, 30.272037]
	});
	//创建标记
	addMarkers(locations);
	//使用knockout显示列表并实现筛选功能
	ko.applyBindings(new ViewModel());
}

function addMarkers(locations) {
	locations.forEach(function(location) {
		//根据location对象创建点标记
		var marker = new AMap.Marker(location);
		marker.setMap(map);
		//将marker与location关联在一起实现点标记的筛选功能
		location.marker = marker;
	});
}

/*
var largeInfoWindow = new AMap.InfoWindow();

//初始函数
function init() {
	//创建地图
	map = new AMap.Map(document.getElementById('map'), {
		zoom: 13,
		center: [120.16428, 30.272037]
	});

	//绑定按钮
	document.getElementById('show-listings').addEventListener('click', showListings);
	document.getElementById('hide-listings').addEventListener('click', hideListings);

	//创建点标记
	for(var i = 0; i < locations.length; i++) {
		addMarker(locations[i]);
	}

	showList();
}

//添加点标记
function addMarker(location) {
	var lng = location.lng;
	var lat = location.lat;
	var title = location.title;

	var marker = new AMap.Marker({
		position: [lng, lat],
		title: title
	});


	marker.on('click', populateInfoWindow);

	markers.push(marker);

	showListings();

}

//填充信息窗体
function populateInfoWindow() {
	var position = this.getPosition();
	var title = this.getTitle();

	var infoWindow = new AMap.InfoWindow({
		content: title
	});

	infoWindow.open(map, position);
}

//显示点标记
function showListings() {
	markers.forEach(function(marker) {
		marker.setMap(map);
	});
}
//隐藏点标记
function hideListings() {
	markers.forEach(function(marker) {
		marker.setMap(null);
	});
}
//列出点标记
function showList() {
	var unordList = document.getElementById('markerList');
	markers.forEach(function(marker) {
		var list = document.createElement('li');
		list.innerHTML = marker.getTitle();
		unordList.appendChild(list);
	});

}
*/