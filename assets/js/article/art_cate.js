$(function(){
    var layer=layui.layer
    var form=layui.form
    //获取文章分类的列表
    initArtCateList()

    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                //console.log(res)
                var htmlStr=template('tpl-table',res)
                $('tbody').html(htmlStr)          
            }
        })
    }
    //为添加类别按钮绑定点击事件

    var indexAdd=null
    $('#btnAddCate').on('click',function(){
        indexAdd=layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类'
            ,content: $('#dialog-add').html()
          });         
    })

    //通过代理添加按钮点击事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('新增分类失败！')
                }
                
                initArtCateList()
                layer.msg('新增分类成功！')

                //根据索引，关闭对应的弹出层(在添加类别的时候申明并绑定 var indexAdd=null)
                layer.close(indexAdd)
            }
        })
    })

    //通过代理的形式为btn-edit按钮绑定点击事件
    var indexEdit=null
    $('tbody').on('click','.btn-edit',function(){
        indexEdit=layer.open({
            type:1,
            area:['500px','250px'],
            title: '修改文章分类'
            ,content: $('#dialog-edit').html()
          })
          
          var id=$(this).attr('data-id')
          //console.log(id)
          $.ajax({
                method:'GET',
                url:'/my/article/cates/'+id,
                success:function(res){
                    //console.log(res)
                   //form.val('form-edit', res.data)
                   form.val('form-edit', res.data)
                }

          })
    })

    //通过代理的形式，为修改分类的表单绑定submin事件

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改失败！')
                }
                layer.msg('新增分类成功！')
                layer.close(indexEdit)
                initArtCateList()    
            }

        })
    })

    //通过代理的形式，绑定btn-delete删除事件
    $('tbody').on('click','.btn-delete',function(){
        var id=$(this).attr('data-id')
        //提示用户是否删除
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index)
                    initArtCateList()  
                }
            })
            
            
        })
    })
})