$(function () {
    let form = layui.form;
    let layer = layui.layer; 
    let state;
$.ajax({
    url:"/my/article/cates",
    success:function (res) {
        if(res.status !== 0){
            return layer.msg(res.message); 
        }
        res.data.forEach(e => {
            $("#cate-select").append(`<option value="${e.Id}">${e.name}</option>`)
        });
        form.render(); // 更新全部
    }
})


// =============== 图片裁剪 ===============
  // 1. 初始化图片裁剪器
  let $image = $("#image");

  // 2. 裁剪选项
  let options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  $("#chooseBtn").click(() => {
    $("#file").click();
  });

  $("#file").on("change", function() {
   let file = this.files[0];
   let newImgURL = URL.createObjectURL(file);

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  })

  $("#pubBtn").on("click",() => {
    state = "已发布";
  })
  $("#saveBtn").on("click",() => {
    state = "草稿";
  })

  $("#pub-form").on("submit", function (e) {
    e.preventDefault();

    $image
    .cropper("getCroppedCanvas", {
      // 创建一个 Canvas 画布
      width: 400,
      height: 280,
    })
    .toBlob((blob) => {
      let fd = new FormData(this); // 参数需要是form这个DOM对象
      fd.append("state", state);
      fd.append("cover_img", blob);
      // fd.forEach((item) => console.log(item));
      // return;
      pubArt(fd);
    });
  })

  function pubArt(data) {
    $.ajax({
      type: "POST",
      url:"/my/article/add",
      data: data,
      contentType: false,
      processData: false,
      success:function (res) {
          if(res.status !== 0){
              return layer.msg(res.message); 
          }
         layer.msg(res.message, ()=>{
          location.href = "/home/article/article-page-list.html";
         }); 
      }
    })
  }


})