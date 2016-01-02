function setCircle(pos, map, c) {
    c = new google.maps.Circle({
        center: pos,
        map: map,
        radius: 500,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FFFFFF",
        fillOpacity: 0.1
    });
    //return c;
};

function setMarker(map, loca, icon) {
    new google.maps.Marker({
        map: map,
        position: loca,
        icon: icon
    });
};
function nullMap(a){
    for(var i=0;i<a.length;i++)
    {
        a[i].setMap(null);
    }
}
function showMarkses(a,map){
    for(var i=0;i<a.length;i++)
    {
        a[i].setMap(map);
    }
}
function dis(x1, y1, x2, y2) {
    var d1 = Math.abs(x1 - x2) * 60.0 * 1.852;
    var d2 = Math.abs(y1 - y2) * 60.0 * 1.852;
    var z = Math.pow(d1, 2) + Math.pow(d2, 2);
    var d = Math.sqrt(z);
    return parseFloat(d.toFixed(3));
};

function attachSecretMessage(marker, secretMessage, map) {
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(secretMessage);
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
};
function ShowInfo(marker,msg,map){
    if (infowindow) { infowindow.close(); }
    infowindow.setContent(msg);
    infowindow.open(map, marker);
}
function setPOS(map, loca, icon) {
    var marker = new google.maps.Marker({
        map: map,
        position: loca,
        icon: icon
    });
    var infowindow = new google.maps.InfoWindow()
    infowindow.setContent('<b>您的所在位子</b>');
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
    map.setCenter(loca);
};



//map1
function initialize1() {
    $.getJSON("js/loca.js", function (data) {
        //設定
        var i = 0;
        var x;
        var y;
        var mapOptions = {
            zoom: 13,
            mapTypeControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.LEFT_TOP
            },
            scaleControl: true,
            //streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            }
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // 定位所在位址
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                x = position.coords.latitude;
                y = position.coords.longitude;
                //標記定位的位子
                var marker = new google.maps.Marker({
                    map: map,
                    position: pos,
                    icon: "img/big_resized.png"
                });
                //畫取範圍
                /*var myCity = new google.maps.Circle({
                map: map,
                center: pos,            //中心點
                radius: 500,            //圓圈範圍,單位(公尺)
                strokeColor: "#0000FF", //線的顏色
                strokeOpacity: 0.8,     //線的透明度
                strokeWeight: 2,        //線的寬度
                fillColor: "#FFFFFF",   //圓圈的顏色
                fillOpacity: 0.1        //圓圈的透明度
                });*/
                //將 myCity 圖層加入至 map

                //標記點的訊息資料
                var infowindow = new google.maps.InfoWindow()
                infowindow.setContent('<b>' + x + ',' + y + '</b>');
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });
                map.setCenter(pos);
            });
        }
        var markers = [];
        var heatmapData = [];   //建立資料陣列
        //取的座標資料
        $.each(data, function () {
            //標記作標位子
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(data[i].wgs_x, data[i].wgx_y)
            });
            markers.push(marker);
            heatmapData.push(new google.maps.LatLng(data[i].wgs_x, data[i].wgx_y));    //將資料增加到陣列裡
            i++;
        });
        function setMarker(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }

        }

        $("#heat").click(function () {
            heatmap.setMap(map);
            setMarker(null);
        });
        $("#marker").click(function () {
            heatmap.setMap(null);
            setMarker(map);
        });
        $("#both").click(function () {
            heatmap.setMap(map);
            setMarker(map);
        })
        var pointArray = new google.maps.MVCArray(heatmapData);
        var heatmap = new google.maps.visualization.HeatmapLayer({
            map: map,
            data: pointArray,        // 資料的來源
            radius: 40,              // 每個點的半徑 (單位 px)
            opacity: 0.5,            // 熱圖圖層透明度 (0 ~ 1)
            gradient: ['transparent', '#f00', '#0f0', '#00f'] //指定顏色範圍 ex:透明, 紅, 綠, 藍
        });
        //將 heatmap 圖層加入至 map
    });
};

//map2
function initialize2() {
    //設定
    $.getJSON("js/loca.js", function (data) {
        var Ashbury = { lat: 25.042774, lng: 121.535063 };
        var mapOptions = {
            zoom: 13,
            mapTypeControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.LEFT_TOP
            },
            scaleControl: true,
            //streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            center: Ashbury
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


        var marker = new google.maps.Marker({ map: map, icon: "img/big_resized.png" });
        var circle = new google.maps.Circle({
            map: map,
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FFFFFF",
            fillOpacity: 0.0
        });
        var d = 0.0;
        var markers = [];
        google.maps.event.addListener(map, 'click', function (event) {
            $("select").change(function () {
                $("select option:selected").each(function () {
                    if ($(this).val() == "0") {
                        marker.setPosition(event.latLng);
                        circle.setCenter(event.latLng);
                        circle.setRadius(0);

                    } else {
                        circle.setRadius(parseFloat($(this).val()));
                        var val = parseFloat($(this).val());
                        d = val / 1000;

                        marker.setPosition(event.latLng);
                        circle.setCenter(event.latLng);
                        var x = event.latLng.lat();
                        var y = event.latLng.lng();
                        var i = 0;
                        $.each(data, function () {
                            var marker1 = new google.maps.Marker({
                                position: new google.maps.LatLng(data[i].wgs_x, data[i].wgx_y)
                            });
                            markers.push(marker1);
                            if (dis(x, y, data[i].wgs_x, data[i].wgx_y) < d) {
                                markers[i].setMap(map);
                            }
                            else {
                                markers[i].setMap(null);
                            }
                            i++;
                        });

                    }
                });
            }).change();
        });
    });
}

function twd97_to_latlng(x, y,x1,y1) {
    var pow = Math.pow, M_PI = Math.PI;
    var sin = Math.sin, cos = Math.cos, tan = Math.tan;
    var a = 6378137.0, b = 6356752.314245;
    var lng0 = 121 * M_PI / 180, k0 = 0.9999, dx = 250000, dy = 0;
    var e = pow((1 - pow(b, 2) / pow(a, 2)), 0.5);

    x -= dx;
    y -= dy;

    var M = y / k0;

    var mu = M / (a * (1.0 - pow(e, 2) / 4.0 - 3 * pow(e, 4) / 64.0 - 5 * pow(e, 6) / 256.0));
    var e1 = (1.0 - pow((1.0 - pow(e, 2)), 0.5)) / (1.0 + pow((1.0 - pow(e, 2)), 0.5));

    var J1 = (3 * e1 / 2 - 27 * pow(e1, 3) / 32.0);
    var J2 = (21 * pow(e1, 2) / 16 - 55 * pow(e1, 4) / 32.0);
    var J3 = (151 * pow(e1, 3) / 96.0);
    var J4 = (1097 * pow(e1, 4) / 512.0);

    var fp = mu + J1 * sin(2 * mu) + J2 * sin(4 * mu) + J3 * sin(6 * mu) + J4 * sin(8 * mu);

    var e2 = pow((e * a / b), 2);
    var C1 = pow(e2 * cos(fp), 2);
    var T1 = pow(tan(fp), 2);
    var R1 = a * (1 - pow(e, 2)) / pow((1 - pow(e, 2) * pow(sin(fp), 2)), (3.0 / 2.0));
    var N1 = a / pow((1 - pow(e, 2) * pow(sin(fp), 2)), 0.5);

    var D = x / (N1 * k0);

    var Q1 = N1 * tan(fp) / R1;
    var Q2 = (pow(D, 2) / 2.0);
    var Q3 = (5 + 3 * T1 + 10 * C1 - 4 * pow(C1, 2) - 9 * e2) * pow(D, 4) / 24.0;
    var Q4 = (61 + 90 * T1 + 298 * C1 + 45 * pow(T1, 2) - 3 * pow(C1, 2) - 252 * e2) * pow(D, 6) / 720.0;
    var lat = fp - Q1 * (Q2 - Q3 + Q4);

    var Q5 = D;
    var Q6 = (1 + 2 * T1 + C1) * pow(D, 3) / 6;
    var Q7 = (5 - 2 * C1 + 28 * T1 - 3 * pow(C1, 2) + 8 * e2 + 24 * pow(T1, 2)) * pow(D, 5) / 120.0;
    var lng = lng0 + (Q5 - Q6 + Q7) / cos(fp);

    lat = (lat * 180) / M_PI;
    lng = (lng * 180) / M_PI;
    return {
        lat: lat,
        lng: lng
    };
}
function address_to_latlng(address) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results) {
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
    });
}

function changMap(map,a,show,hide)
{
    map.addListener('zoom_changed', function () {
        if (map.getZoom() > show) {
            for (var i = 0; i < a.length; i++) {
                a[i].setMap(map);
            }
        }
        else if (map.getZoom() <= hide) {
            for (var i = 0; i < a.length; i++) {
                a[i].setMap(null);
            }
        }
    });
}