var map;

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
		map: map,
		position: [lng, lat],
		title: title
	});

	marker.on('click',
		populateInfoWindow);

}

//填充信息窗体
function populateInfoWindow() {
	var position = this.getPosition();
	var title = this.getTitle();
	console.log(position)
	var infoWindow = new AMap.InfoWindow({
		content: title
	});

	infoWindow.open(map, position);
}