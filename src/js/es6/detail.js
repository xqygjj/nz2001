let add = document.querySelector('.add')
let red = document.querySelector('.red')
let sz = document.querySelector('.sz')
let number = document.querySelector('.number')
number.onclick = function(e){
    e = e || window.event
    let tar = e.target || e.scrElement
    let val = Number(sz.innerHTML)
    if(tar.className== 'red'){
        if(val>1){
            val--
        }
        
    }else if(tar.className == 'add'){
        if(val<5){
            val++
        }
        
    }
    sz.innerHTML = val
}

class Details{
    // 获取页面需要标签和地址 以及 写要启动的方法
    constructor(){
        // 获取数字框内容
        this.sz = document.querySelector('.sz')
        this.context = document.querySelector('.context')
        
        // 加入购物车按钮
        this.intocar = document.querySelector(".intocar");
        // 进入购物车按钮
        this.tocart = document.querySelector('.tocart')
        this.url = "http://localhost:3000/data/goodsList.json";
        this.cartbtn = document.querySelector('.cartbtn')
        this.load();
        this.getId();
        this.init()
        // this.addEvent()
    }
    // 详情页中获取列表页中传过来的id标识
    getId(){
        this.id = location.search.slice(1).split("=")[1];
    }
    // 获取数据和列表页是同一个json文件
    load(){
        var that = this;
        $.getJSON(this.url,function(data){
            that.data = data;
            that.display(data);
        })
    }
    // 把获取的到数据遍历出id与传过来的id比较拿出具体商品渲染页面
    display(data){
        // console.log(data);
        data.forEach(val => {
            if(val.goodId === this.id){
                $(".size").eq(0).before(
                `<p class="fir">
                    <span class="s1">${val.content}</span>
                    <a href="" class="adi">${val.title}</a>
                    <span class="s2">更多</span>
                </p>
                <p class="sec">更多Adidas阿迪达斯产品：<a href="">ADIDAS阿迪达斯</a> </p>
                <div class="price">
                    <span class="s1">好乐买价</span>
                    <span class="s2">&yen;${val.price}</span>
                    <span class="s3">&yen;${val.yuanjia}</span>
                    <span class="s4">${val.zhekou}折</span>
                    <a class="total"  href="">
                        <span class="cmtxt">累计评价</span>
                        <span class="cmtnum">0</span>
                    </a>
                </div>
                <div class="color">
                    <h5>颜色</h5>
                    <span>
                        <img src="${val.colImg}" alt="">
                    </span>
                </div>`);
                this.addEvent();
            }
        });
    }
    // 页面中需要初始化的地方
    init(){
        //创建storage对象
        let storage = window.localStorage;
        //获取storage记录
        let storage_str = storage.getItem('goodsMsg') ? storage.getItem('goodsMsg') : '';
        //转成对象
        let storage_obj = convertStrToObj(storage_str);
        let sum = 0;
        for(let key in storage_obj){
            sum += storage_obj[key].num;
        }
        this.cartbtn.innerHTML = `购物车(${sum})`;
   }
//    跳转事件和增加数量事件
    addEvent(){
        var that = this;
        this.intocar.onclick = function(eve){
            that.goodId = that.id;
            let nu = Number(that.sz.innerHTML)
            that.setData(nu);
        }
        this.tocart.onclick = function(){
            location.href = 'carts.html'
        }
    }
    // 写入localstorage
    setData(nu){
        // console.log(nu);
        // console.log(this.goodId);
        
        var gm = localStorage.getItem("goodsMsg");
        // console.log(gm);
        if(gm === null){
            gm = [{
                goodId:this.goodId,
                num:nu,
                msg:this.getData(this.goodId)
            }];
        }else{
            gm = JSON.parse(gm);
            var a = 0;//判断状态
            for(var i=0;i<gm.length;i++){
                if(gm[i].goodId === this.goodId){
                    gm[i].num += nu;
                    a = 1;
                    break;
                }
            }
            if(a == 0){
                gm.push({
                    goodId:this.goodId,
                    num:nu,
                    msg:this.getData(this.goodId)
                })
            }
        }
        // 写入localhost中
        localStorage.setItem("goodsMsg",JSON.stringify(gm));

        //获取购物车按钮上的值
        // 本地存储中的数据更新以后 更改页面中要更新的数据
        let str = this.cartbtn.innerHTML;
        let re = /(\d+)/;
        let num = Number(re.exec(str)[1]);
        num+=nu;
        this.cartbtn.innerHTML = `购物车(${num})`;
        this.tocart.value = `购物车(${num})`;
    }
    getData(id){
        for(var i=0;i<this.data.length;i++){
            if(this.data[i].goodId === id){
                return this.data[i];
            }
        }
        return {};
    }
}
var d = new Details();
// d.addEvent();

window.onscroll = function(){
    $("#totop a").click(function(){
        window.scrollY = 0
    })
    
}