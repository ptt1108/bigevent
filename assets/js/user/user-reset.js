$(function () {
    let form = layui.form;
    let layer = layui.layer;
    // 密码校验
    form.verify({
        checkPwd: function(value){ //value：表单的值、item：表单的DOM对象
        let oldPwd = $("[name=oldPwd]").val();
          if(value === oldPwd){
            return "原密码与新密码一致";
          }
        },
        checkrePwd: function(value){ //value：表单的值、item：表单的DOM对象
            let newPwd = $("[name=newPwd]").val();
              if(value !== newPwd){
                return "密码不一致";
              }
            }
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
      });  


      $("#user-reset").on("submit", function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type:"POST",
            url:"/my/updatepwd",
            data: data,
            success:function (res) {
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                $("#user-reset [type=reset]").click();
                return layer.msg(res.message);
            }
        })
  
      })

})