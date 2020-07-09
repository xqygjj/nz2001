class List{
    constructor(){
        this.url = "http://localhost:3000/data/goodsList.json";
        this.$cont = $(".cont")
        this.load();
    }
    load(){
        var that = this;
        $.getJSON(this.url,function(data){
            that.display(data)
        })
    }
    display(data){
        // console.log(data);
        let str = "";
        for(var i=0;i<data.length;i++){
            str += `<li index="${data[i].goodId}">
                        <a href="detail.html?id=${data[i].goodId}">
                            <img class="good"
                                src="${data[i].src}"
                                alt="">
                            <p class="name">${data[i].name}</p>
                        </a>
                        <p class="price">￥${data[i].price} (${data[i].zhekou}折) <span class="und">${data[i].yuanjia}</span> </p>
                        <p class="tj"><span class="s1">${data[i].tj1}</span> <span class="s2">${data[i].tj2}</span> </p>
                    </li>`
        }
        this.$cont.append(str);
    }
}
new List;