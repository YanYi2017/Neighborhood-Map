var map;
var positions = [
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
function init() {
	map = new AMap.Map(document.getElementById('map'), {
		zoom: 13,
		center: [120.16428, 30.272037]
	});

	//创建点标记
	for(var i = 0; i < positions.length; i++) {
		var lng = positions[i].lng;
		var lat = positions[i].lat;
		var position = new AMap.LngLat(lng, lat);
		console.log(lng);

		var marker = new AMap.Marker({
			map: map,
			position: position
		});
	}
}
