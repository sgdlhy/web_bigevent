$(function(){
    var form=layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.lenght>6){
                return "长度在1-6个字符之间！"
            }
        }
    })

    initUserInfo()
    //初始化用户基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !==0){
                    return layer.msg('获取信息失败！')
                }
                //console.log(res)
                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置表单
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })


    //更新用户信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新失败！')
                }
                layer.msg('更新信息成功')
                //调用父页面的方法，重新渲染用户的头像和信息
                //window.parent.getUserInfo()
                window.parent.getUserInfo()
            }
        })
    })
})



