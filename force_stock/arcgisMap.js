layui.use(['layer', 'table', 'element', 'laydate'], function () {
    let layer = layui.layer,
        $ = layui.jquery;
    let listMap = {};
    require([
        "esri/config"
        , "esri/Map"
        , "esri/views/MapView"
        , "esri/Graphic"
        , "esri/layers/GraphicsLayer"
        , "esri/geometry/support/webMercatorUtils"
        , "esri/views/draw/Draw"
        , "esri/geometry/Polygon"
        , "esri/geometry/Point"
        , "esri/symbols/TextSymbol"
        , "esri/geometry/Circle"
        , "esri/layers/WebTileLayer"
        , "esri/symbols/Font"
        , "esri/geometry/Extent"
    ], function (
        esriConfig
        , EsriMap
        , MapView
        , Graphic
        , GraphicsLayer
        , webMercatorUtils
        , Draw
        , Polygon
        , Point
        , TextSymbol
        , Circle
        , WebTileLayer
        , Font
        , Extent
    ) {
        esriConfig.apiKey = "AAPK1ff769e87da54aecabc2a41990ffbe31HLgdMgvKpOyHtXOoUHNQ4JCMP-dLSdLRvk10EhspnIJi6UEAmIjeIMTOqzWsGlE5";

        const tiledLayer = new WebTileLayer({
            urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=ac5c1404b6929da9e82ba9a21f6230eb",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        });

        const tiledLayer_poi = new WebTileLayer({
            urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=ac5c1404b6929da9e82ba9a21f6230eb",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        });

        const map = new EsriMap({
            basemap: {
                baseLayers: [tiledLayer, tiledLayer_poi]
            }
        });

        const view = new MapView({
            map: map,
            center: [121.39652939662952, 31.105404164707778], // Longitude, latitude
            zoom: 10,
            container: "viewDiv"
        });
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        update();

        view.on("click", function (e) {
            let geom = webMercatorUtils.xyToLngLat(e.mapPoint.x, e.mapPoint.y);
            if (e.button === 0) {
                console.log(geom[0], geom[1]);
            } else if (e.button === 2) {
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
                            v = v.replaceAll(' ', '\n');
                            addCircleLayer(geom[0], geom[1], v);
                            layer.closeAll();
                            return false;
                        }
                    }
                });
            }
        });

        //-------------------------------------------------------------------------

        let fillSymbol = {
            type: "simple-fill",
            color: [227, 139, 79, 0.8],
            // style: "solid",
            outline: {
                color: "red",
                width: 1
            }
        };

        let pointSymbol = {
            type: "simple-marker",
            style: "circle",
            size: 12,
            color: [227, 139, 79, 0.8],
        }

        let drawTool = new Draw({
            view: view
        });

        function showPolygon(event) {
            let polygon = new Polygon({
                rings: event.vertices,
                spatialReference: view.spatialReference
            });
            let polygonGraphic2 = new Graphic({
                geometry: polygon,
                symbol: fillSymbol
            });
            view.graphics.removeAll();
            view.graphics.add(polygonGraphic2);
        }

        function addPolygonGraphic(event) {
            let polygon = new Polygon({
                rings: event.vertices,
                spatialReference: view.spatialReference
            });
            let polygonGraphic = new Graphic({
                geometry: polygon,
                symbol: fillSymbol
            });
            view.graphics.removeAll();
            graphicsLayer.add(polygonGraphic);
        }

        document.getElementById("drawPolygon").addEventListener("click", function (e) {
            let drawAction = drawTool.create("polygon", {mode: "click"});
            drawAction.on("vertex-add", showPolygon);
            drawAction.on("vertex-remove", showPolygon);
            drawAction.on("cursor-update", showPolygon);
            drawAction.on("draw-complete", addPolygonGraphic);
        });

        // document.getElementById("drawPoint").addEventListener("click", function (e) {
        //     let drawAction = drawTool.create("point");
        //     // drawAction.on("cursor-update", showPoint);
        //     drawAction.on("draw-complete", addPointGraphic);
        // });

        function addPointGraphic(event) {
            let point = new Point({
                x: event.coordinates[0],
                y: event.coordinates[1],
                spatialReference: view.spatialReference
            });
            let pointGraphic = new Graphic({
                geometry: point,
                symbol: pointSymbol
            });
            graphicsLayer.add(pointGraphic);
        }

        document.getElementById("clearDrawings").addEventListener("click", function (e) {
            graphicsLayer.removeAll();
        })

        $('.saveAll').on('click', function () {
            let cc = graphicsLayer.graphics;
            let polygonArr = [];
            let circleMap = {};
            if (cc) {
                cc.forEach(c => {
                    if (c.visible) {
                        let type = c.geometry.type;
                        let wkid = c.geometry.spatialReference.wkid;
                        if (type === 'point') {
                            //只记录text symbol
                            if (c.symbol.type === 'text') {
                                let text = c.symbol.text;
                                let x = c.geometry.x, y = c.geometry.y;
                                let k = y + ',' + x;
                                circleMap[k] = text;
                                // console.log(text + '|' + x + '|' + y);
                            }
                        } else if (type === 'polygon') {
                            if (!Object.getPrototypeOf({__proto__: null}) === null) {
                                layer.alert('需要使用支持prototype属性的浏览器，如谷歌');
                            } else {
                                //从原型链中获取类型
                                //如果是circle，此处不记录，textSymbol相当于就是没有半径的圆，统一半径即可
                                let protoClass = c.geometry.__proto__.declaredClass;
                                if (protoClass === 'esri.geometry.Circle') {
                                } else {
                                    //四边形
                                    console.log(c)
                                    let rings = c.geometry.rings;
                                    rings.forEach(r => {
                                        let ra = [];
                                        r.forEach(rr => {
                                            let rm = {};
                                            if (wkid === 102100) {
                                                let latLngArr = gen(rr[0], rr[1])
                                                rm.lng = latLngArr[0];
                                                rm.lat = latLngArr[1];
                                                ra.push(rm);
                                            } else if (wkid === 4326) {
                                                rm.lng = rr[0];
                                                rm.lat = rr[1];
                                                ra.push(rm);
                                            } else {
                                                layer.alert('还未添加的坐标代号:' + wkid)
                                            }

                                        })
                                        polygonArr.push(ra)
                                    });
                                }
                            }
                        }
                    }
                });
            }
            listMap.circle = circleMap;
            listMap.polygon = polygonArr;
            console.log(listMap)
            saveData(listMap);
        });

        $('.updateAll').on('click', function () {
            update();
        });

        function update() {
            layer.msg('加载图层中...', {icon: 16, shade: [0.5, '#f5f5f5'], scrollbar: false, offset: 'auto', time: 3000});
            graphicsLayer.removeAll();
            $.ajax({
                type: "GET",
                url: "/api/getLayers",
                dataType: "JSON", success: function (res) {
                    let circles = [];
                    let polygons = [];
                    const resMap = new Map(Object.entries(res));
                    resMap.forEach((k, v) => {

                        if (v.indexOf("2circle") !== -1) {
                            circles.push(k);
                        } else if (v.indexOf("1p") !== -1) {
                            polygons.push(k);
                        }
                    });

                    if (polygons && polygons.length) {
                        polygons.forEach(p => {
                            let pointA = [];
                            p.forEach(pp => {
                                let lat = pp.lat;
                                let lng = pp.lng;
                                pointA.push([lng, lat]);
                            });
                            console.log(pointA);
                            addPolygon(pointA);
                        });

                    }
                    if (circles && circles.length) {
                        circles[0].forEach(a => {
                            addCircleLayer(a.lng, a.lat, a.content)
                        });
                    }
                }
            });
        }

        function saveData(pushData) {
            $.ajax({
                type: "POST",
                url: '/api/save',
                data: JSON.stringify(pushData),
                contentType: "application/json",
                success: function (res) {
                    console.log(res)
                    listMap = {};
                }
            });
        }

        function gen(x, y) {
            return webMercatorUtils.xyToLngLat(x, y);
        }

        function addPolygon(rings) {
            const polygon = {
                type: "polygon",
                rings: rings
                // rings: [[121.46018126936518, 31.251744091116826], [121.49546103509026, 31.252529443764885], [121.48533234329777, 31.22340855641815], [121.45589107604586, 31.22042498183095], [121.46018126936518, 31.251744091116826]]
            };
            const simpleFillSymbol = {
                type: "simple-fill",
                color: [227, 139, 79, 0.8],
                outline: {
                    color: [255, 255, 255],
                    width: 1
                }
            };
            const polygonGraphic = new Graphic({
                geometry: polygon,
                symbol: simpleFillSymbol
                // symbol: textSymbol
            });
            graphicsLayer.add(polygonGraphic);
        }


        function addCircleLayer(x, y, v) {
            v = v.replaceAll('<br>', '\n');
            const circleGeometry = new Circle({
                center: [x, y],
                geodesic: true,
                numberOfPoints: 100,
                radius: 6000,
                radiusUnit: "meters"
            });

            graphicsLayer.add(new Graphic({
                geometry: circleGeometry,
                symbol: {
                    type: "simple-fill",
                    color: [135, 175, 99],
                    outline: {
                        color: [255, 255, 255],
                        width: 1
                    }
                }
            }));
            const point = {
                type: "point",
                longitude: x,
                latitude: y
            };
            let textSymbol = {
                type: "text",
                color: "white",
                haloColor: "black",
                haloSize: "1px",
                text: v,
                xoffset: 0,
                yoffset: -3,
                horizontalAlignment: 'center',
                verticalAlignment: 'middle',
                font: {
                    size: 12,
                    // family: "Josefin Slab",
                    // weight: "bold"
                }
            };
            graphicsLayer.add(new Graphic({
                geometry: point
                , symbol: textSymbol
            }));
        }

        $('.getBoundary').on('click', function () {
            let v = $('input[name="ctName"]').val();
            // getBoundaryForBaidu(v);
            getBoundsForGaoDe(v);
        });


        function getBoundaryForBaidu(cn) {
            let bdary = new BMap.Boundary();
            bdary.get(cn, function (rs) {       //获取行政区域
                let lid = rs.boundaries;
                for (let i = 0; i < lid.length; i++) {
                    let arr = [];
                    let lids = lid[i].replaceAll(' ', '').split(';');
                    lids.forEach(l => {
                        let p = l.split(',');
                        arr.push([p[0], p[1]]);
                    })
                    addPolygon(arr);
                }
            });
        }

        let district = null;

        function getBoundsForGaoDe(v) {
            if (!district) {
                let opts = {
                    subdistrict: 0,
                    extensions: 'all',
                    level: 'district'
                };
                district = new AMap.DistrictSearch(opts);
            }
            district.setLevel('district')
            district.search(v, function (status, result) {
                polygons = [];
                let bounds = result.districtList[0].boundaries;
                if (bounds) {
                    for (let i = 0; i < bounds.length; i++) {
                        let bds = bounds[i];
                        let par = [];
                        for (let j = 0; j < bds.length; j++) {
                            par.push([bds[i].lng, bds[i].lat]);
                        }
                        console.log(par)
                        addPolygon(par);
                    }
                }
            });
        }

        //-------------------------------------------------------------------------
    });
});


