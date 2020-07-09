function tocart(){
    $('.tocart').click(function(){
        if(getCookie('registors')){
            location.href = 'pages/carts.html'
        }else{
            alert('请先登录')
            setTimeout(()=>{
                location.href = 'pages/login.html'
            },2000)
        }
    })
}
tocart()
