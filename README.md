# clock
电子时钟的jQuery插件

demo:http://newliuren.github.io/clock/index.html

使用时需要提供一个外部的容器，在内部盒子中初始化时钟，盒子需设置宽高，
时钟初始化时会自动计算并使用较小值作为时钟边长，不会冲破容器


例子：

首先提供两个盒子，外部的作为容器，内部的为时钟

\<div class="box"\>\<div id="clock" style="width:300px;height:300px;"\>\</div\>\</div\>

然后就可以初始化时钟了

var clock = $('#clock').initClock();



initClock()配置项(默认值)

//文字大小(可接受符合css的font-size规则的任意值)

numSize : '90%'

//外框颜色(可接受符合css的颜色规则的任意值，如#fff，rgba(0,0,0,0.7),hsla(100,10,10,0.7)下同)

outsideColor : '#ffe168'

//内框颜色

insideColor : 'rgba(253, 213, 58, 0.8)'

//文字颜色

fontColor : '#ffffff'

//小刻度颜色

markSmallColor : '#ffeb9a'

//大刻度颜色

markBigColor : '#fffbe9'

//指针背景颜色

pointerBgColor : '#fffced'

//秒针背景颜色

secPointerBgColor : '#ade383'

//时针背景颜色

hourPointerColor : '#fffced'

//分针背景颜色

minPointerColor : '#fffced'

//秒针背景颜色

secPointerColor : '#ade383'


如:
var clock = $('#clock').initClock({
    outsideColor : 'rgba(232, 104, 104, 0.8)',
    insideColor : 'rgba(252, 58, 58, 0.6)',
    markSmallColor : '#FF9999',
    secPointerBgColor : '#E3D984',
    secPointerColor : '#E1E384'
});


方法：

1.run()按照当前时间运行时钟
clock.run();


2.setTime(msec)设置时钟的时间，msec[number]为要设置时间的毫秒数
clock.setTime(msec);


3.getTime([isShow])返回当前时间，参数isShow[boolean]可选，若有参数，则返回hh:mm:ss格式的时间，否则返回时钟当前的毫秒数
clock.getTime(true));


4.setColor(name, color)修改当前时钟的样式，只能为initClock()配置项中的值，颜色格式与初始化时的值格式相同
clock.Color('outsideColor', '#666');

