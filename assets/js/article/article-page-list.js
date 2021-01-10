$(function () {
let form = layui.form;
let layer = layui.layer;
let query = {
    pagenum:1,
    pagesize:2,
    cate_id: "",
    state : ""
}

// 分类
  $.ajax({
    url: "/my/article/cates",
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("获取分类数据失败");
      }

      // 获取成功
      // 遍历data数据
      res.data.forEach((item) => {
        $(`<option value="${item.Id}">${item.name}</option>`).appendTo($("[name=category]"));
      });
      // 动态创建的option添加到select下拉框中，不会自动的更新下拉框的界面，需要手动调用以下方法来实现表单的重新渲染
      form.render(); // 更新全部
    },
  });


    // 列表
    getArticlePageList();
    function getArticlePageList() {
        $.ajax({
            url: "/my/article/list",
            data:query,
            success:function (res) {
                let htmlStr = template("trListTips", res);
                $("#tb-page-list").html(htmlStr);

                //分页渲染
                pageRender(res.total);
            }
        })
    }

    let laypage = layui.laypage;
    function pageRender(total) {
        laypage.render({
            elem: 'page-render', 
            count: total,
            curr:query.pagenum,
            limit:query.pagesize,
            limits:[2, 5, 10, 20],
            layout: ["count", "limit", "prev", "page", "next", "skip"],
            jump: function(obj, first){
                //obj包含了当前分页的所有参数
                query.pagenum = obj.curr;
                query.pagesize = obj.limit;
                //首次不执行
                if(!first){
                    getArticlePageList();
                }
              }
        });
    }
    
    //筛选
    $("#article-condition").on("submit", function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        query.cate_id = $("[name=category]").val();
        query.state = $("[name=status]").val();
        query.pagenum = 1;
        getArticlePageList();
    })

    // 删除
    $("#tb-page-list").on("click", "#deleteBtn", function(){
        layer.confirm('确认删除吗?', {icon: 3, title:'提示'}, index => {
        let id = $(this).attr("eid");
        $.ajax({
            url: "/my/article/delete/" + id,
            success:function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                getArticlePageList();
                return layer.msg(res.message);
            }
        })
    })
});

//编辑
$("#tb-page-list").on("click", "#editBtn", function () {
    let id = $(this).attr("eid");
    location.href = "/home/article/article-edit.html?id=" + id;
})


})