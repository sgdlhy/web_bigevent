$(function(){

    var form=layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        snamePwd:function(value){
            if(value==$('[name=oldPwd]').val()){
                return '新旧密码不一样'
            }
        },
        rePwd:function(value){
            if(value !==$('[name=newPwd]').val()){
                return '两次默默不一致'
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layui.layer.msg('更新失败')
                }
                layui.layer.msg('更新成功')
                //重置表单 转为DOW元素用reset()方法
                $('.layui-form')[0].reset()
            }
        })
    })

})