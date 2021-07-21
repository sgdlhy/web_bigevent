$(function(){
    //调用 获取用户信息
    getUserInfo()

    var layer=layui.layer
    $('#btnLogout').on('click',function(){
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //1.清除本地存储的token
            localStorage.removeItem('token')
            //重新跳转到登录页面
            location.href='/login.html'
            //关闭询问框
            layer.close(index);
          });
    })
})

//获取用户基本信息
function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
       /*  headers:{
            Authorization:localStorage.getItem('token') || ''
        }, */
        success: function(res){
           //console.log(res)
            if(res.status !== 0){
                return layui.layer.msg('获取信息失败')
            }
            renderAvatar(res.data)
        },

        //无论成功还是失败，最终都会调用complete回调函数
      /*   complete:function(res){
            //console.log(res)
            //使用res.responseJSON拿到服务器响应回来的数据
            if(res.responseJSON.status==1 && res.responseJSON.message =='身份认证失败！'){
                //强制情况token
                localStorage.removeItem('token')
                //强制跳转到登录页面
                location.href='/login.html'
            }
        } */
  
    })
}

function renderAvatar(user){
    var name=user.nickname||user.username
    $('#welcome').html('欢迎&nbsp'+name)
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}