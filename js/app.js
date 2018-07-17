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
function addMarker(position) {
	var lng = position.lng;
	var lat = position.lat;
	var title = position.title;

	var marker = new AMap.Marker({
		map: map,
		position: [lng, lat],
		title: title
	});
}
