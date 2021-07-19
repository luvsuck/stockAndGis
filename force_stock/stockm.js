let tableIns;
layui.use(['layer', 'table', 'element', 'laydate'], function () {
        let layer = layui.layer,
            $ = layui.jquery,
            table = layui.table;

        getData();

        function getData() {
            $.ajax({
                type: 'get',
                url: '/api/getDetails/RK200108008',
                success: function (data) {
                    if (!data || !data.length) {
                        layer.alert('明细为空!');
                    }
                    let jsonData = JSON.parse(data);
                    let count = jsonData.length;
                    let tableArray = [];
                    jsonData.forEach(d => {
                        let addTime = d.addTime;
                        let amounts = d.amounts;
                        let descr = d.descr;
                        let detailsName = d.detailsName;
                        let detailsNo = d.detailsNo;
                        let locationId = d.locationId;
                        let orderNo = d.orderNo;
                        let stockAmount = d.stockAmount;

                        let trData = {
                            "taskNo": orderNo + '-' + detailsNo,
                            "descr": descr,
                            "detailsName": detailsName,
                            "amounts": amounts,
                            "stockAmount": stockAmount,
                            "locationId": locationId,
                            "addTime": addTime
                        };
                        tableArray.push(trData);
                    });
                    genTable(tableArray);
                }, error: function () {
                    layer.alert('出错了');
                }
            });
        }

        function genTable(tableArray) {
            tableIns = table.render({
                elem: '#orderList',
                data: tableArray,
                limit: 5,
                id: "orderList",
                cols: [[
                    // {field: 'No', title: 'No', type: 'numbers'},
                    {
                        field: 'taskNo',
                        width: '20%',
                        title: '任务号',
                        sort: "true",
                        align: 'center',
                        style: "text-align:center;font-size:8px;"
                    }
                    , {
                        field: 'descr',
                        width: '12%',
                        title: '描述',
                        sort: "true",
                        align: 'center',
                        style: "text-align:center;font-size:10px;"
                    }
                    , {
                        field: 'detailsName',
                        width: '12%',
                        title: '名称',
                        sort: "true",
                        align: 'center',
                        style: "text-align:center;font-size:10px;"
                    }
                    , {
                        field: 'amounts',
                        width: '10%',
                        title: '应入',
                        align: "center",
                        style: "text-align:center;font-size:10px;"
                    }
                    , {
                        field: 'stockAmount',
                        width: '10%',
                        title: '已入',
                        align: "center",
                        style: "text-align:center;font-size:10px;"
                    }
                    , {field: 'locationId', width: '14%', title: '库位', style: "font-size:6px;"}
                    , {field: 'addTime', width: '22%', title: '创建时间', style: "font-size:6px;"}
                    , {fixed: 'right', title: "操作", width: 65, align: 'center', toolbar: '#toolBar'}
                ]]
            });

        }

        table.on('tool(orderList)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            let data = obj.data;
            let layEvent = obj.event;
            let tr = obj.tr;
            if (layEvent === 'stock') {
                console.log(data)
                layer.confirm('是否确认进行入库上架操作？', {
                    title: '提示',
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    layer.msg('堆垛机执行中...', {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false,offset: 'auto', time:600000});
                    let arr = data.taskNo.split('-');
                    let orderNo = arr[0];
                    let detailNo = arr[1];
                    let dta = {orderNo: orderNo, detailsNo: detailNo, inCount: 1};
                    $.ajax({
                        type: "POST",
                        url: '/api/stockIn',
                        data: JSON.stringify(dta),
                        contentType: "application/json",
                        success: function (res) {
                            if (!res) {
                                layer.alert('执行结果异常');
                                return false;
                            }
                            if (res > 0) {
                                layer.closeAll();
                                layer.msg("已入库!");
                                obj.update({
                                    stockAmount: data.stockAmount + 1
                                });
                                return false;
                            }
                            layer.alert('已全部入库!');
                            return false;
                        }, error: function (err) {
                            layer.alert('执行入库出现异常!')
                            return false;
                        }
                    });
                    layer.close(index);
                }, function () {
                    layer.closeAll();
                });
            }
        });
    }
);