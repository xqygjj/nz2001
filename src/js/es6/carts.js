let btn = document.querySelector('.btn')
// let login_l = document.querySelector('.login_l')
btn.onclick = function (e){
    login_l.style.display = 'block'
    e.stopPropagation()
}
// 点击屏幕空白处登录框消失
document.onclick = function(){
    document.querySelector('.login_l').style.display = 'none'
    document.querySelector('.login_l').onclick = (e)=>{
        e.stopPropagation()
    }
    
}