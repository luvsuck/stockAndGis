let savedArr = [];
let lastData = {};
layui.use(['layer', 'table', 'element', 'laydate'], function () {
    let layer = layui.layer,
        $ = layui.jquery;


    let map = new BMap.Map("allmap");
    // map.enableScrollWheelZoom(true);
    let myGeo = new BMap.Geocoder();
    myGeo.getPoint(
        "上海野生动物园"
        , function (point) {
            if (point) {
                // var pStart = new BMapGL.Point(121.72799516884069, 31.061379570562373);
                // var pEnd = new BMapGL.Point(121.7366548339568, 31.05414058568492);
                // map.addOverlay(new BMap.Marker(pStart));
                // map.addOverlay(new BMap.Marker(pEnd))
                map.centerAndZoom(point, 11);
                map.addOverlay(new BMap.Marker(point))
                update();
            } else {
                alert("您选择地址没有解析到结果!");
            }
        },
        "上海市"
    );

    function genLayer(arr) {
        let polygon = new BMap.Polygon(
            arr, {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.7, fillColor: 'red'}
        );
        map.addOverlay(polygon);
    }

    $('input[name="addLayer"]').on('click', function () {
        // let polygon = new BMap.Polygon(
        //     savedArr, {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.7, fillColor: 'red'}
        // );
        // map.addOverlay(polygon);
        genLayer(savedArr)
    });

    $('input[name="removeLayer"]').on('click', function () {
        map.clearOverlays();
    });

    // ----------------------------------

    //定义绘制样式
    let styleOptions = {
        strokeColor: "red",    //边线颜色。
        fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }

    let drawingManager = new BMapLib.DrawingManager(map, {
        // isOpen: false,
        // enableDrawingTool: false,
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT,//位置
            offset: new BMap.Size(5, 5), //offset
        },
        polygonOptions: styleOptions
    });

    // 绘制完毕回调
    let overlaycomplete = function (e) {
        savedArr = [];
        let ao = e.overlay.Ao;
        if (ao) {
            e.overlay.Ao.forEach(e => {
                savedArr.push(new BMap.Point(e.lng, e.lat));
            })
        }
    };
    drawingManager.addEventListener('overlaycomplete', overlaycomplete);

    map.addEventListener("rightclick", function (eve) {
        let plng = eve.point.lng;
        let plat = eve.point.lat;
        if (plng && plat) {
            layer.open({
                type: 1,
                // title: '确认标语',
                title: false,
                skin: 'layui-layer-demo',
                closeBtn: 0,
                anim: 4,
                shadeClose: false,
                btn: ['确定', '取消'],
                content: '<input type="text" name="labelContent" placeholder="请您键入标语,空格符等效于换行" class="layui-input">'
                , success() {
                    let int = $('input[name="labelContent"]');
                    if (int)
                        int.focus();
                }
                , btn1: function () {
                    let v = $('input[name="labelContent"]').val();
                    if (!v) {
                        layer.alert('请您键入标语,空格符等效于换行');
                        return false;
                    } else {
                        v = v.replaceAll(' ', '<br\>');
                        genCircle(plng, plat, v);
                        layer.closeAll();
                        return false;
                    }
                }
            });
            // let marker = new BMap.Marker(point);
            // map.addOverlay(marker);
        }

        // else if (e.latlng.lng && e.latlng.lat) {
        //     let marker1 = new BMapGL.Marker(new BMapGL.Point(e.latlng.lng, e.latlng.lat));
        //     map.addOverlay(marker1);
        // }
        // if (confirm(e.point.lng + "," + e.point.lat)) {
        //     $("shape").innerHTML = $("shape").innerHTML + " <br/>(" + e.point.lng + "," + e.point.lat + ")";
        // }
    });

    $('input[name="paint"]').on('click', function () {
        if (drawingManager._isOpen) {
            drawingManager.close();
        } else {
            let drawingType = BMAP_DRAWING_POLYGON;
            drawingManager.setDrawingMode(drawingType);
            drawingManager.open();
        }
    });
    $('input[name="save"]').on('click', function () {
        let allOverlay = map.getOverlays();
        let circleMap = {};
        let polygonArr = [];
        allOverlay.forEach(ao => {
            if (ao.isVisible()) {
                let type = ao.__proto__.yQ;
                if (type) {
                    if (type === "Polygon") {
                        let aoArray = ao.Ao;//多边形的每个点的经纬度
                        polygonArr.push(aoArray);
                    } else if (type === "Label") {
                        // type === "Circle"
                        let labelContent = ao.content;
                        let lat = ao.point.lat;
                        let lng = ao.point.lng;
                        let k = lat + "," + lng;
                        circleMap[k] = labelContent;
                        // circleMap.set(k, labelContent);
                    }
                }
            }
        });

        lastData.polygon = polygonArr;
        lastData.circle = circleMap;
        console.log(JSON.stringify(lastData));
        console.log(lastData)
        saveData(lastData)
        return false;
    });

    function saveData(pushData) {
        $.ajax({
            type: "POST",
            url: '/api/save',
            data: JSON.stringify(pushData),
            contentType: "application/json",
            success: function (res) {
                console.log(res)

            }
        });
    }

    function update() {
        map.clearOverlays();
        $.ajax({
            type: "GET",
            url: "/api/getLayers",
            dataType: "JSON", success: function (res) {
                let circles = [];
                let polygons = [];
                const map = new Map(Object.entries(res));
                map.forEach((k, v) => {
                    if (v.indexOf("2circle") !== -1) {
                        circles.push(k)
                        // console.log(circles)
                    } else if (v.indexOf("1p") !== -1) {
                        polygons.push(k)
                    }
                });
                polygons.forEach(p => {
                    let pointA = [];
                    p.forEach(pp => {
                        let lat = pp.lat;
                        let lng = pp.lng;
                        pointA.push(new BMap.Point(lng, lat));
                    });
                    genLayer(pointA)
                });

                circles[0].forEach(a => {
                    genCircle(a.lng, a.lat, a.content)
                });
            }
        });
    }

    $('input[name="update"]').on('click', function () {
        update();
    });

    function genCircle(lng, lat, text) {
        let point2 = new BMap.Point(lng, lat);
        // map.addOverlay(new BMap.Marker(point2));
        // map.centerAndZoom(point2, 11);

        let circle = new BMap.Circle(point2,
            4000, {
                strokeColor: "#0dd917",
                strokeWeight: 2,
                // strokeOpacity: 1.0,
                fillColor: "#0dd917"
            });

        let opts = {
            position: point2,
            // offset: new BMap.Size(-50, -10)
            offset: new BMap.Size(0, -10)
        }
        let label = new BMap.Label(text, opts);
        label.setStyle({
            color: "#FFF",
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            fontSize: "12px",
            height: "24px",
            lineHeight: "20px",
            fontFamily: "微软雅黑"
        });
        map.addOverlay(circle);
        map.addOverlay(label);
    }
});

