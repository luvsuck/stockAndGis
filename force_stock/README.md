基于WebService的仓储cxf web程序以及webGIs项目

-----

1. 数据导入

   基于mysql数据库，使用项目中的stockment.sql脚本快速建库。

   ![image-20210719233405774](/Users/zyy/Library/Application Support/typora-user-images/image-20210719233405774.png)

2. 导入后段工程文件到您的ide工具中。
3. 启动springboot项目查看wsdl相关信息![image-20210719233548764](/Users/zyy/Library/Application Support/typora-user-images/image-20210719233548764.png)

4. 启动前端服务器，这里简单使用nginx作为前端服务器，您也可以使用node.js![image-20210719233752695](/Users/zyy/Library/Application Support/typora-user-images/image-20210719233752695.png)



-----

##### 相关功能测试

1.  入库功能测试 

   ![image-20210719233847527](/Users/zyy/Library/Application Support/typora-user-images/image-20210719233847527.png)

![image-20210719233927032](/Users/zyy/Library/Application Support/typora-user-images/image-20210719233927032.png)

此处暂设为单个单个数量入库，应按实际情况选择要入库的数量。

​	 1.1堆垛机线程阻塞30秒，执行入库时

![image-20210720000649484](/Users/zyy/Library/Application Support/typora-user-images/image-20210720000649484.png)

​	1.2 执行完毕，可以看到执行时间为30多秒

![image-20210720000728175](/Users/zyy/Library/Application Support/typora-user-images/image-20210720000728175.png)

2. webgis项目功能测试

   1. 访问同级目录下的map.html![image-20210720001141557](/Users/zyy/Library/Application Support/typora-user-images/image-20210720001141557.png)

   2. 单击下方绘制，可以使用鼠标设立多个点绘制多边形，双击鼠标左键结束绘制。![image-20210720001347810](/Users/zyy/Library/Application Support/typora-user-images/image-20210720001347810.png)

   3. 单击鼠标右键，以点击点为圆心生成标注物，键入标语，若包含换行请使用空格符号代替。![image-20210720001514387](/Users/zyy/Library/Application Support/typora-user-images/image-20210720001514387.png)

   ![image-20210720001543732](/Users/zyy/Library/Application Support/typora-user-images/image-20210720001543732.png)

![image-20210720001556466](/Users/zyy/Library/Application Support/typora-user-images/image-20210720001556466.png)

	4. 单击保存，会讲当前地图上的标注与覆盖层信息，保存到数据库。
 	5. 单击更新按钮，强制同步数据库数据到地图上。