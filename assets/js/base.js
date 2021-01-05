$.ajaxPrefilter(function (options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    options.headers= {
        Authorization:localStorage.getItem("token")
    }
})