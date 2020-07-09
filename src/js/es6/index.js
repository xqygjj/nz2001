// let a = $('.nav-item')
// let $subMenu = $('.subMenu')

// 划过事件
$(function(){
    $('ul.nav li.nav-item').hover(function(){
        // $(this).children('div.subMenu').stop().slideToggle(600);
        $('.subMenu').finish().slideDown(300);
    },function(){
        // $(this).children('div.subMenu').stop().slideToggle(600);
        $('.subMenu').finish().slideUp(300);
    })
})
// 获取数据渲染页面
function getDate(){
    let $insert = $('.insert')
    let nav = document.querySelectorAll('.nav-item')
    for(let i = 0;i<nav.length;i++){
        nav[i].onmouseenter = function (){
            // console.log(i);
            $.getJSON('../../data/list.json',(data)=>{
                // console.log(data);
                $insert.html('')
                var obj = data[i]
                // console.log(obj);
                for(var k in obj){//obj里头有两个对象这个循环是二次循环创建两个li
                    var li = document.createElement('li')
                    // console.log(k);
                    $(li).append(
                    `<a href="#">${k}</a>`//把第一个对象中的键都拿出来放到这个地方
                    )
                    // console.log(obj[k]);
                    var ul = document.createElement('ul')
                    ul.className = 'uls' 
                    let obj1 = obj[k]//值是一个对象
                    for(var l in obj1){
                        // console.log(l);
                        $(ul).append(`
                            <p class="ydx">${l}</p>
                        `)
                        var li2 = document.createElement('li')
                        for(var b =0;b<obj1[l].length;b++){
                            $(li2).append(
                                `<a href="pages/list.html">${obj1[l][b]}</a>`
                            )
                        }
                    $(ul).append(li2)
                }
                $(li).append(ul)
                $insert[i].append(li)
                }
            })
        }
    }
}
getDate()
// 轮播图
function Lbt (){
    var mySwiper = new Swiper('.swiper-container',{
        pagination :{
          el: '.swiper-pagination',
          clickable :true,
        }
      })
      //鼠标滑过pagination控制swiper切换
      for(i=0;i<mySwiper.pagination.bullets.length;i++){
        mySwiper.pagination.bullets[i].onmouseover=function(){
          this.click();
        };
      } 
      //如果你在swiper初始化后才决定使用clickable，可以这样设置
      mySwiper.params.pagination.clickable = true ;
      //此外还需要重新初始化pagination
      mySwiper.pagination.destroy()
      mySwiper.pagination.init()
      mySwiper.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');
} 
Lbt()
// 倒计时
function GetRTime(time,ele){
    var EndTime= new Date(time);
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    var sm = 0;
    if(t>=0){
        d=Math.floor(t/1000/60/60/24);
        h=Math.floor(t/1000/60/60%24);
        m=Math.floor(t/1000/60%60);
        s=Math.floor(t/1000%60);
        sm = Math.floor(t%1000/100)
    }
    
    for(var i = 0;i<document.querySelectorAll(ele).length;i++){
        document.querySelectorAll(ele +' .t_h')[i].innerHTML = h + "小时";
        document.querySelectorAll(ele +' .t_m')[i].innerHTML = m + "分";
        document.querySelectorAll(ele +' .t_s')[i].innerHTML = s + "秒";
        document.querySelectorAll(ele +' .t_ms')[i].innerHTML = sm ;
    }
}
function jishi(time,ele) {
    setInterval(()=>{GetRTime(time,ele)},0);
}
let usersStr = getCookie('registors')
let usersObj = convertStrToObj(usersStr)
// if(usersObj){
    // this.content.innerHTML = `欢迎${usersObj.uname}`
// }
let yjdl = document.querySelector('.yjdl')
console.log(yjdl);

// console.log(usersObj);
// console.log(usersObj);
// if(usersObj){
//     yjdl.innerHTML = `欢迎${usersObj}`
// }
window.onscroll = function(){
    $("#totop a").click(function(){
        window.scrollY = 0
    })
    
}