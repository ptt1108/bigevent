$(function () {
let form = layui.form;
let layer = layui.layer;
let id;

    getInfo();
    function getInfo() {
      $.ajax({
        url: "/my/userinfo",
        success: function (res) {
          if (res.status !== 0) {
            return '获取用户基本信息失败！';
          }
          form.val("user-update", res.data);
          id = res.data.id;
      
        },
      });
    }

$("#user-update").on("submit", function (e) {
    e.preventDefault();
    let userinfo = form.val("user-update");
    // userinfo["id"]= id;
    $.ajax({
        type:"POST",
        url:"/my/userinfo",
        data: `id=${id}&nickname=${userinfo.nickname}&email=${userinfo.email}`,
        success:function (res) {
          window.parent.getAvatarAndName();
           return layer.msg(res.message);
        }
    })
})


// 用户昵称校验
form.verify({
    checkNick: function(value, item){ //value：表单的值、item：表单的DOM对象
        if(value.length > 6){
            return '昵称长度必须在1-6字符之间';
        }
    }
  });      
})
