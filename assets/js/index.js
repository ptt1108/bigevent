function getAvatarAndName() {
    $.ajax({
        url:"/my/userinfo",
        success: function(res){
            if(res.status === 0){
                getUserInfo(res.data);
            }
            
        }
    })
}


function getUserInfo(data) {
    let name = data.nickname || data.username;
    $(".user-name").text(name);

    if(data.user_pic !== null){
        $(".layui-nav-img").attr("src", data.user_pic).show();
        $(".user-img").hide();
    }else{
        let str = name[0].toUpperCase();
        $(".user-img").text(str).show();
        $(".layui-nav-img").hide();
    }
}

getAvatarAndName();
// 退出
$(".exit-btn").on("click", function () {
    layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
        localStorage.removeItem("token");
        location.href = "/home/login.html";
        layer.close(index);
      });

})
