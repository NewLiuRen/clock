;(function ($, window, undefined) {

    function Clock (ele, opts) {
        this.$ele = ele;
        this.options = $.extend({}, Clock.DEFAULT, opts);
        //保存设置时间
        this.time = 0;
        //保存定时器
        this.timer = null;
    }
    Clock.DEFAULT = {
        //文字大小
        numSize : '90%',
        //外框颜色
        outsideColor : '#ffe168',
        //内框颜色
        insideColor : 'rgba(253, 213, 58, 0.8)',
        //文字颜色
        fontColor : '#ffffff',
        //小刻度颜色
        markSmallColor : '#ffeb9a',
        //大刻度颜色
        markBigColor : '#fffbe9',
        //指针背景颜色
        pointerBgColor : '#fffced',
        //秒针背景颜色
        secPointerBgColor : '#ade383',
        //时针背景颜色
        hourPointerColor : '#fffced',
        //分针背景颜色
        minPointerColor : '#fffced',
        //秒针背景颜色
        secPointerColor : '#ade383'
    };

    // 渲染时钟
    var _drawClock = function () {

        var box = this.$ele,
        // 正方形边长，取宽高中的小者
        sideLenth = box.width()<box.height() ? box.width() : box.height(),
        // 原点位置
        origin = sideLenth/2,
        // 定义样式
        clockStyle = {
            // 定义外框样式
            outsideStyle : {
                top : sideLenth/2,
                left : sideLenth/2,
                size : sideLenth,
                margin : -sideLenth/2,
                box_shadow : 'inset 0 0 '+sideLenth*0.1+'px #fed34b,0 '+sideLenth*0.02+'px '+sideLenth*0.04+'px #ccc'
            },
            // 定义刻度样式
            markStyle : {
                small : {
                    width : '1.04%',
                    height : '2.59%',
                    background : this.options.markSmallColor,
                    radius : '50%/33.3%'
                },
                big : {
                    width : '1.3%',
                    height : '3.63%',
                    background : this.options.markBigColor,
                    radius : '60%/26.67%'
                },
                numSize : this.options.numSize
            },
            //定义颜色
            color : {
                outsideColor : this.options.outsideColor,
                insideColor : this.options.insideColor,
                fontColor : this.options.fontColor,
                pointerBgColor : this.options.pointerBgColor,
                secPointerBgColor : this.options.secPointerBgColor,
                hourPointerColor : this.options.hourPointerColor,
                minPointerColor : this.options.minPointerColor,
                secPointerColor : this.options.secPointerColor
            },
            // 表针底部装饰样式
            pointerBgStyle : {
                pos : sideLenth/2,
                size : sideLenth*0.0789,
                box_shadow : sideLenth*0.0098625+'px '+sideLenth*0.0098625+'px '+sideLenth*0.01578+'px #e1a91e'
            },
            // 秒针底部装饰样式
            secPointerBgStyle : {
                box_shadow : sideLenth*0.0039434+'px '+sideLenth*0.0039434+'px '+sideLenth*0.0088763+'px #d0d9bf'
            },
            // 时针样式
            hourPointerStyle : {
                box_shadow : '0px 0px '+sideLenth*0.01578+'px #e1a91e'
            },
            // 分针样式
            minPointerStyle : {
                box_shadow : '0px 0px '+sideLenth*0.01578+'px #e1a91e'
            },
            // 秒针样式
            secPointerStyle : {
                box_shadow : '0px 0px '+sideLenth*0.01578+'px #e1a91e'
            }
        },
        // 刻度尺寸
        mark = '',
        i;

        /*******************
               渲染表盘
         *******************/

        // 若存在表盘则不渲染
        if (box.find('.outside').length || box.find('.inside').length) {
            return;
        }

        // 容器相对定位
        if (box.css('position') !== 'relative' || box.css('position') !== 'absolute') {
            box.css('position', 'relative');
        }

        // 创建外框，定义样式并进行定位
        $('<div/>').attr('class', 'outside').css({
            'position':'absolute',
            'top':clockStyle.outsideStyle.top,
            'left':clockStyle.outsideStyle.left,
            'width':clockStyle.outsideStyle.size,
            'height':clockStyle.outsideStyle.size,
            'transform':'translate(-50%,-50%)',
            '-webkit-transform':'translate(-50%,-50%)',
            '-moz-transform':'translate(-50%,-50%)',
            'background':clockStyle.color.outsideColor,
            'box-shadow':clockStyle.outsideStyle.box_shadow,
            '-webkit-box-shadow':clockStyle.outsideStyle.box_shadow,
            '-moz-box-shadow':clockStyle.outsideStyle.box_shadow,
            'border-radius':'25%',
            '-webkit-border-radius':'25%',
            '-moz-border-radius':'25%'
        }).appendTo(box);

        // 创建内框，定义样式并进行定位
        $('<div/>').attr('class', 'inside').css({
            'position':'absolute',
            'top':'50%',
            'left':'50%',
            'width':'35.2%',
            'height':'35.2%',
            'z-index':'99',
            'margin-top':'-17.6%',
            'margin-left':'-17.6%',
            'background':clockStyle.color.insideColor,
            'border-radius':'50%',
            '-webkit-border-radius':'50%',
            '-moz-border-radius':'50%'
        }).appendTo(box.find('.outside'));

        // 创建刻度，渲染刻度样式
        for (i=0 ; i<60 ; i+=1) {
            mark = i%5 ? 'small' : 'big';

            $('<div/>').attr('class', 'mark'+mark.charAt(0).toUpperCase()+mark.slice(1)).css({
                'position':'absolute',
                'left':(sideLenth*(1-parseFloat(clockStyle.markStyle[mark].width)/100)*0.5),
                'top':(sideLenth*(1-parseFloat(clockStyle.markStyle[mark].width)/100)*0.5),//sideLenth*0.1295,
                'width':clockStyle.markStyle[mark].width,
                'height':clockStyle.markStyle[mark].height,
                'background':clockStyle.markStyle[mark].background,
                'border-radius':clockStyle.markStyle[mark].radius,
                '-webkit-border-radius':clockStyle.markStyle[mark].radius,
                '-moz-border-radius':clockStyle.markStyle[mark].radius,
                'transform':'rotate('+(i*6)+'deg) translateY('+sideLenth*0.3668+'px)',
                '-webkit-transform':'rotate('+(i*6)+'deg) translateY('+sideLenth*0.3668+'px)',
                '-moz-transform':'rotate('+(i*6)+'deg) translateY('+sideLenth*0.3668+'px)'
            }).appendTo(box.find('.outside'));
        }

        // 渲染时钟数字，渲染样式
        for (i=0 ; i<4; i+=1) {
            $('<span/>').attr('class', 'font').text(i===0 ? '12' : 3*i).css({
                'position':'absolute',
                'left':(sideLenth*(0.5-0.2668*Math.sin(-i*Math.PI/2))),
                'top':(sideLenth*(0.65-0.2668*Math.cos(-i*Math.PI/2))),
                'display':'inlind-block',
                'transform':'translate(-50%, -50%)',
                '-webkit-transform':'translate(-50%, -50%)',
                '-moz-transform':'translate(-50%, -50%)',
                'text-shadow':'1% 1% 1% #ffd134',
                'font-size':clockStyle.markStyle.numSize,
                'font-weight':'bold',
                'color':clockStyle.color.fontColor
            }).appendTo(box.find('.outside'));
        }

        /*******************
               渲染表针
         *******************/
        // 表针底部装饰
        $('<div/>').attr('class', 'pointerBg').css({
            'position':'absolute',
            'top':clockStyle.pointerBgStyle.pos,
            'left':clockStyle.pointerBgStyle.pos,
            'width':clockStyle.pointerBgStyle.size,
            'height':clockStyle.pointerBgStyle.size,
            'margin-top':-clockStyle.pointerBgStyle.size/2,
            'margin-left':-clockStyle.pointerBgStyle.size/2,
            'background':clockStyle.color.pointerBgColor,
            'z-index':'890',
            'box-shadow':clockStyle.pointerBgStyle.box_shadow,
            '-webkit-box-shadow':clockStyle.pointerBgStyle.box_shadow,
            '-moz-box-shadow':clockStyle.pointerBgStyle.box_shadow,
            'border-radius':'50%',
            '-webkit-border-radius':'50%',
            '-moz-border-radius':'50%'
        }).appendTo(box);

        // 秒针底部装饰
        $('<div/>').attr('class', 'secPointerBg').css({
            'position':'absolute',
            'top':'50%',
            'left':'50%',
            'width':'60%',
            'height':'60%',
            'background':clockStyle.color.secPointerBgColor,
            'z-index':'900',
            'box-shadow':clockStyle.secPointerBgStyle.box_shadow,
            '-webkit-box-shadow':clockStyle.secPointerBgStyle.box_shadow,
            '-moz-box-shadow':clockStyle.secPointerBgStyle.box_shadow,
            'transform':'translate(-50%,-50%)',
            '-webkit-transform':'translate(-50%,-50%)',
            '-moz-transform':'translate(-50%,-50%)',
            'border-radius':'50%',
            '-webkit-border-radius':'50%',
            '-moz-border-radius':'50%'
        }).appendTo(box.find('.pointerBg'));

        // 时针
        $('<div/>').attr('class', 'hourPointer').css({
            'position':'absolute',
            'top':'50%',
            'left':'50%',
            'width':'292.84%',
            'height':'40.69%',
            'background':clockStyle.color.hourPointerColor,
            'z-index':'880',
            'box-shadow':clockStyle.hourPointerStyle.box_shadow,
            '-webkit-box-shadow':clockStyle.hourPointerStyle.box_shadow,
            '-moz-box-shadow':clockStyle.hourPointerStyle.box_shadow,
            'border-radius':'6.68%/50.03%',
            '-webkit-border-radius':'6.68%/50.03%',
            '-moz-border-radius':'6.68%/50.03%',
            'transform-origin':'left top',
            '-webkit-transform-origin':'left top',
            '-moz-transform-origin':'left top',
            'transition':'all 0.2s ease-out',
            '-webkit-transition':'all 0.2s ease-out',
            '-moz-transition':'all 0.2s ease-out',
            'transform':'rotate(-90deg) translateY(-50%)',
            '-webkit-transform':'rotate(-90deg) translateY(-50%)',
            '-moz-transform':'rotate(-90deg) translateY(-50%)'
        }).appendTo(box.find('.pointerBg'));

        // 分针
        $('<div/>').attr('class', 'minPointer').css({
            'position':'absolute',
            'top':'50%',
            'left':'50%',
            'width':'440.84%',
            'height':'40.69%',
            'background':clockStyle.color.minPointerColor,
            'z-index':'880',
            'box-shadow':clockStyle.minPointerStyle.box_shadow,
            '-webkit-box-shadow':clockStyle.minPointerStyle.box_shadow,
            '-moz-box-shadow':clockStyle.minPointerStyle.box_shadow,
            'border-radius':'6.68%/50.03%',
            '-webkit-border-radius':'6.68%/50.03%',
            '-moz-border-radius':'6.68%/50.03%',
            'transform-origin':'left top',
            '-webkit-transform-origin':'left top',
            '-moz-transform-origin':'left top',
            'transition':'all 0.2s ease-out',
            '-webkit-transition':'all 0.2s ease-out',
            '-moz-transition':'all 0.2s ease-out',
            'transform':'rotate(-90deg) translateY(-50%)',
            '-webkit-transform':'rotate(-90deg) translateY(-50%)',
            '-moz-transform':'rotate(-90deg) translateY(-50%)'
        }).appendTo(box.find('.pointerBg'));

        // 秒针
        $('<div/>').attr('class', 'secPointer').css({
            'position':'absolute',
            'top':'50%',
            'left':'50%',
            'width':'620.84%',
            'height':'10.69%',
            'background':clockStyle.color.secPointerColor,
            'z-index':'880',
            'box-shadow':clockStyle.secPointerStyle.box_shadow,
            '-webkit-box-shadow':clockStyle.secPointerStyle.box_shadow,
            '-moz-box-shadow':clockStyle.secPointerStyle.box_shadow,
            'border-radius':'3.68%/50.03%',
            '-webkit-border-radius':'3.68%/50.03%',
            '-moz-border-radius':'3.68%/50.03%',
            'transform-origin':'left top',
            '-webkit-transform-origin':'left top',
            '-moz-transform-origin':'left top',
            'transition':'all 0.2s ease-out',
            '-webkit-transition':'all 0.2s ease-out',
            '-moz-transition':'all 0.2s ease-out',
            'transform':'rotate(-90deg) translate(-20%, -50%)',
            '-webkit-transform':'rotate(-90deg) translate(-20%, -50%)',
            '-moz-transform':'rotate(-90deg) translate(-20%, -50%)'
        }).appendTo(box.find('.pointerBg'));

    };

    /**
     * 返回当前的时间对象
     * @param  {number} msec [传入毫秒数，若不传参，则为当前毫秒数]
     * @return {object}      [返回时间对象，msec:毫秒数, hour:小时数(用来时钟显示), fullhour:小时数(24小时制) , min:分钟数, sec:秒数]
     */
    var _getTime = function (msec) {
        //判断是否传入参数，(传入毫秒数减去28800000，为从1970-1-1开始的时间)
        var time = isNaN(msec) ? new Date() : new Date(msec),
            hour = time.getHours()>12 ? time.getHours()-12 : time.getHours(),
            min = time.getMinutes(),
            sec = time.getSeconds(),
            rmsec = msec ? msec : time.getTime();

        return {
            msec : rmsec,
            hour : hour,
            fullhour : time.getHours(),
            min : min,
            sec : sec
        };
    };

    // 获取时间，控制指针转动
    var _runClock = function (box, msec) {
        var time = _getTime(msec);

        if (!$('.pointerBg').length) {
            console.log('the clock is not draw');
            return;
        }

        box.find('.hourPointer').css({
            'transform':'rotate('+(time.hour*30+time.min/2-90)+'deg) translateY(-50%)',
            '-webkit-transform':'rotate('+(time.hour*30+time.min/2-90)+'deg) translateY(-50%)',
            '-moz-transform':'rotate('+(time.hour*30+time.min/2-90)+'deg) translateY(-50%)'
        });

        box.find('.minPointer').css({
            'transform':'rotate('+(time.min*6-90)+'deg) translateY(-50%)',
            '-webkit-transform':'rotate('+(time.min*6-90)+'deg) translateY(-50%)',
            '-moz-transform':'rotate('+(time.min*6-90)+'deg) translateY(-50%)'
        });

        box.find('.secPointer').css({
            'transform':'rotate('+(time.sec*6-90)+'deg) translate(-20%, -50%)',
            '-webkit-transform':'rotate('+(time.sec*6-90)+'deg) translate(-20%, -50%)',
            '-moz-transform':'rotate('+(time.sec*6-90)+'deg) translate(-20%, -50%)'
        });
    };

    // 为时钟指针添加过渡
    var _addTranstion = function (box) {
        box.find('.hourPointer').css({
            'transition':'all 0.2s ease-out',
            '-webkit-transition':'all 0.2s ease-out',
            '-moz-transition':'all 0.2s ease-out',
        });
        box.find('.minPointer').css({
            'transition':'all 0.2s ease-out',
            '-webkit-transition':'all 0.2s ease-out',
            '-moz-transition':'all 0.2s ease-out',
        });
        box.find('.secPointer').css({
            'transition':'all 0.2s ease-out',
            '-webkit-transition':'all 0.2s ease-out',
            '-moz-transition':'all 0.2s ease-out',
        });
    };

    // 为时钟指针取消过渡
    var _cancleTranstion = function (box) {
        box.find('.hourPointer').css({
            'transition':'',
            '-webkit-transition':'',
            '-moz-transition':''
        });
        box.find('.minPointer').css({
            'transition':'',
            '-webkit-transition':'',
            '-moz-transition':''
        });
        box.find('.secPointer').css({
            'transition':'',
            '-webkit-transition':'',
            '-moz-transition':''
        });
    };

    Clock.prototype = {
        constructor : Clock,

        //显示时钟
        run : function () {
            var that = this,
                box = that.$ele;

            this.time = _getTime().msec;

            //2秒后移除过度效果，否则分针经过0点时会回转一圈
            setTimeout(function () {
                _cancleTranstion(box);
            }, 2000);

            //启动时钟，记录时钟当前时间
            this.timer = setInterval(function () {
                _runClock(box, that.time);
                that.time += 1000;
            }, 1000);
        },

        //设置时钟时间
        setTime : function (msec) {
            try {
                if (isNaN(msec) || msec>8e15) {
                    throw(new Error('the set time is wrong!'));
                }

                var that = this,
                    box = that.$ele;

                //添加过度效果，增强视觉体验
                if (!box.find('.hourPointer').css('transition') || box.find('.hourPointer').css('transition').indexOf('0s') !== -1) {
                    _addTranstion(box);
                }

                this.time = parseInt(msec);

                if (this.timer) {
                    clearInterval(this.timer);
                }

                //2秒后移除过度效果，否则分针经过0点时会回转一圈
                setTimeout(function () {
                    _cancleTranstion(box);
                }, 2000);

                //启动时钟，记录时钟当前时间
                this.timer = setInterval(function () {
                    _runClock(box, that.time);
                    that.time += 1000;
                }, 1000);
            } catch (e) {
                console.log(e);
            }

        },

        //获得当前时间
        getTime : function (isShowTime) {
            var time = null;

            if (isShowTime === true) {
                time = _getTime(this.time);
                return (time.fullhour<10 ? '0'+time.fullhour : time.fullhour) + ':' + (time.min<10 ? '0'+time.min : time.min) + ':' + (time.sec<10 ? '0'+time.sec : time.sec);
            }

            return this.time;
        },

        //设置颜色
        setColor : function (name, color) {
            var box = this.$ele;

            if (Clock.DEFAULT[name] && name!== 'fontColor') {
                box.find('.'+name.slice(0,name.indexOf('Color'))).css({'background':color});
            } else if (Clock.DEFAULT[name] && name === 'fontColor') {
                box.find('.'+name.slice(0,name.indexOf('Color'))).css({'color':color});
            } else {
                return false;
            }
        }
    };

    $.fn.initClock = function (opts) {
        var clock = new Clock(this, opts);

        _drawClock.apply(clock);

        return clock;
    };

})(jQuery, window);
