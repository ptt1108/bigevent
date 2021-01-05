$(".register-btn").on("click", function () {
    $(".login").hide();
    $(".register").show();
})

$(".login-btn").on("click", function () {
    $(".register").hide();
    $(".login").show();
})

// 表单验证
// 注册
let form = layui.form;
let layer = layui.layer;
form.verify({
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    
    repwd: function(value, item){ //value：表单的值、item：表单的DOM对象
        let pwd = $(".register [name = password]").val().trim();
        if(value !== pwd){
            return "密码不一致";
        }
      }
  });


$("#register-form").on("submit", function(e){
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type:"POST",
        url:"/api/reguser",
        data:data,
        success:function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            layer.msg("注册成功！");
            $(".login-btn").click();
        },
        error: function(){
            return layer.msg("服务器错误！");
        }
    })
})

// 登录
$("#login-form").on("submit", function(e){
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type:"POST",
        url:"/api/login",
        data,
        success:function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            localStorage.setItem("token", res.token);
            layer.msg("登录成功！", () => {
                location.href = "/home/index.html";
            })
        }
    })
})