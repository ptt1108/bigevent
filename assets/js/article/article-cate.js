$(function () {
let form = layui.form;
let layer = layui.layer;
let addIndex;
let editIndex;
    // 列表
    getArticleList();
    function getArticleList() {
        $.ajax({
            url:"/my/article/cates",
            success:function (res) {
                let htmlStr = template("trTips", res);
                $("tbody").html(htmlStr);
            }
        })
    }

    //添加类别
    $("#addCate").on("click", function () {
        addIndex = layer.open({
            type: 1, 
            content: $("#addCateTrips").html(),
            title: "添加文章分类",
            area: '500px',
          });  
          
    })

    // 确认提交
    $("body").on("submit","#addCateForm", function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type:"POST",
            url:"/my/article/addcates",
            data,
            success:function (res) {
                if(res.status!== 0){
                    return layer.msg(res.message);
                }
                layer.close(addIndex);
                getArticleList();
               return layer.msg(res.message);
            }
        })
    })

    //编辑
    $("tbody").on("click", "#editBtn", function () {
        let id = $(this).attr("eid");
        editIndex = layer.open({
            type: 1, 
            content: $("#editCateTrips").html(),
            title: "修改文章分类",
            area: '500px',
          });
         $.ajax({
             url:"/my/article/cates/" + id,
             success:function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
             // 渲染数据
             form.val("editForm", res.data);
            }
         })
    })

    // 确认修改
    $("body").on("submit", "#editCateForm", function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type:"POST",
            url:"/my/article/updatecate",
            data,
            success:function (res) {
                if(res.status!== 0){
                    return layer.msg(res.message);
                }
                layer.close(editIndex);
                getArticleList();
               return layer.msg(res.message);
            }
        })
    })

    // 删除
    $("tbody").on("click","#deleteBtn",function () {
        let id = $(this).attr("eid");
        layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){

            $.ajax({
               url:"/my/article/deletecate/" + id,
                success:function (res) {
                   if(res.status !== 0){
                       return layer.msg(res.message);
                   }
                   layer.close(index);
                   getArticleList();
                  return layer.msg(res.message);
               }
            })
            
          });
    })


})