/**
 * Created by Administrator on 2017/8/15.
 */
//参数说明：第一个参数是布尔值\true完全覆盖容器\false适应容器完全显示
//只有第一个参数为false设置第二个参数才有效果
//第二个参数为间隙颜色
;(function(win,doc,$){
    function ImgFitter(con,flag,bgcolor){
        this.bgColor=bgcolor||"rgba(0,0,0,.8)";
        //图片容器
        this.imageContainer=con;
        //容器下的图片
        this.image=this.imageContainer.find('.S-img-item');
        //容器宽度
        var conWidth=this.imageContainer.width();
        //容器高度
        var conHeight=this.imageContainer.height();
        //图片宽度
        var imageWidth=this.image.width();
        //图片高度
        var imageHeight=this.image.height();
        //容器与图片宽度比值
        var widthRadio=this.imageContainer.width()/imageWidth;
        //容器与图片高度比值
        var heightRadio=this.imageContainer.height()/imageHeight;
        //为了让图片适应容器，取较小的缩放比率，会留黑边
        //为了让图片充满容器，取较大的缩放比率，会有一部分显示不完全
        if(flag){
            this.radio=widthRadio<heightRadio?heightRadio:widthRadio;
        }else{
            this.radio=widthRadio>heightRadio?heightRadio:widthRadio;
        }
        //如果是需要图片完全显示在容器中，则需要判断是上下 还是左右留黑边，并计算黑边宽度
        if(!flag){
            this.prop=conWidth/conHeight>imageWidth/imageHeight?'paddingLeft':'paddingTop';
            this.val=conWidth/conHeight>imageWidth/imageHeight?parseInt((conWidth-imageWidth*this.radio)/2):parseInt((conHeight-imageHeight*this.radio)/2);
        }
        //按要求进行图片缩放，并设置缩放原点
        this.imageScale(flag);
    }
    ImgFitter.init=function(flag,bgcolor){
        var _this_=this;
        $('.S-img-container').each(function(){
            new _this_($(this),flag,bgcolor);
        })
    };
    ImgFitter.prototype={
        constructor:ImgFitter,
        imageScale:function(flag){
            if(flag){
                this.imageContainer.css({'overflow':'hidden'});
                this.image.css({'transformOrigin':'0 0','transform':'scale('+this.radio+')'});
            }else{
                this.imageContainer.css(this.prop,this.val).css('background',this.bgColor);
                this.image.css({'transformOrigin':'0 0','transform':'scale('+this.radio+')'});
            }
        }
    };
    win['ImgFitter']=ImgFitter;
})(window,document,jQuery,undefined);