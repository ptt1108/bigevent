$.ajax({
    url:"/my/userinfo",
    success: function(res){
        if(res.status === 0){
            getUserInfo(res.data);
            console.log(res);
        }
        
    }
})

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

// 退出
$(".exit-btn").on("click", function () {
   localStorage.removeItem("token");
   location.href = "/home/login.html";
})
