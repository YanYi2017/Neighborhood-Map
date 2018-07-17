var map;
var markers = [];

var locations = [
	{
		lng: 120.151223,
		lat: 30.258051,
		title: "断桥残雪"
	},
	{
		lng: 120.144437,
		lat: 30.246294,
		title: "湖心亭"
	}
];

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


function showListings() {
	markers.forEach(function(marker) {
		marker.setMap(map);
	});
}

function hideListings() {
	markers.forEach(function(marker) {
		marker.setMap(null);
	});
}