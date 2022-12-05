let errorCode = 0;
let idSelect = "";
let validateInput = () => {
  let dataInput = document.querySelector(".data-input");
  if (dataInput.value === "") {
    alert(`Vui lòng nhập thông tin bài đăng`);
    errorCode = 1;
  } else {
    errorCode = 0;
  }
  console.log(errorCode);
};

let image = "";
let fileImage = document.querySelector("#file");
let imagePrevew = document.querySelector(".modal-create-post-image-preview");

fileImage.addEventListener("change", () => {
  const fr = new FileReader();
  fr.readAsDataURL(fileImage.files[0]);
  fr.addEventListener("load", () => {
    const url = fr.result;
    image = url;
    imagePrevew.style.backgroundImage = `url(${url})`;
  });
});

let handelOpenImageReader = () => {
  let imageReader = document.querySelector(".modal-create-post-image");
  if (imageReader.style.display === "block") {
    imageReader.style.display = "none";
    image = "";
    imagePrevew.style.backgroundImage = `none`;
  } else {
    imageReader.style.display = "block";
    imagePrevew.style.backgroundImage = `none`;
  }
};

let getDate = () => {
  let dateObj = new Date();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();

  time = hours + ":" + minutes + " ngày " + day + " - " + month + " - " + year;
  return time;
};

let clearData = () => {
  let dataInput = (document.querySelector(".data-input").value = "");
  image = "";
  let imageReader = (document.querySelector(
    ".modal-create-post-image"
  ).style.display = "none");
};

$("#exampleModal").on("hidden.bs.modal", (e) => {
  document.querySelector("#update").style.display = "none";
  document.querySelector("#save").style.display = "flex";
});

let openModal = () => {
  clearData();
};

let handelCreateNewPost = () => {
  validateInput();
  let time = getDate();
  let close = document.querySelector(".modal-create-post-btn");

  if (errorCode === 0) {
    let text = document.querySelector("#data-input").value;
    let listPost = localStorage.getItem("list-post")
      ? JSON.parse(localStorage.getItem("list-post"))
      : [];

    listPost.unshift({
      text: text,
      image: image,
      time: time,
    });
    localStorage.setItem("list-post", JSON.stringify(listPost));

    close.setAttribute("data-dismiss", "modal");
  } else {
    close.removeAttribute("data-dismiss");
  }
  handelRenderData();
};

let handelEditPost = (id) => {
  let listPost = localStorage.getItem("list-post")
    ? JSON.parse(localStorage.getItem("list-post"))
    : [];
  let listPostReverse = listPost;
  let dataInput = (document.querySelector(".data-input").value =
    listPostReverse[id].text);

  let imageReader = document.querySelector(".modal-create-post-image");
  document.querySelector("#update").style.display = "flex";
  document.querySelector("#save").style.display = "none";
  document.querySelector("#update").setAttribute("data-dismiss", "modal");
  idSelect = id;
  console.log(id);
  let imagePrevew = document.querySelector(".modal-create-post-image-preview");

  if (listPostReverse[id].image === "") {
    imageReader.style.display = "none";
    imagePrevew.style.backgroundImage = `none`;
  } else {
    imageReader.style.display = "block";
    imagePrevew.style.backgroundImage = `url(${listPostReverse[id].image})`;
    image = listPostReverse[id].image;
    console.log(listPostReverse[id].image);
  }
};

let handleUpdatePost = () => {
  validateInput();
  let listPost = localStorage.getItem("list-post")
    ? JSON.parse(localStorage.getItem("list-post"))
    : [];
  let listPostReverse = listPost;
  let time = getDate();
  listPostReverse[idSelect] = {
    text: document.querySelector("#data-input").value,
    image: image,
    time: time,
  };
  console.log(idSelect);

  localStorage.setItem("list-post", JSON.stringify(listPostReverse));

  handelRenderData();

  document.querySelector("#update").style.display = "none";
  document.querySelector("#save").style.display = "flex";
};

let handleDeletePost = (id) => {
  let check = confirm("Bài đăng sẽ bị xóa vĩnh viển !!!");
  if (check) {
    let listPost = localStorage.getItem("list-post")
      ? JSON.parse(localStorage.getItem("list-post"))
      : [];
    listPost.splice(id, 1);
    localStorage.setItem("list-post", JSON.stringify(listPost));
    handelRenderData();
    alert("Xóa bài đăng thành công =((");
  } else {
    alert("May quá bài đăng an toàn =))");
  }
};

let handelRenderData = () => {
  let listPost = localStorage.getItem("list-post")
    ? JSON.parse(localStorage.getItem("list-post"))
    : [];
  let postHtml = document.querySelector(".post");

  let listPostReverse = listPost;
  let html = "";
  listPostReverse.forEach(function (value, index) {
    html += `<div class="post-main">
               <div class="post-heading">
                   <div class="post-heading-left">
                       <img src="./assets/img/default-avatar.png" alt="">
                       <div class="post-heading-info">
                           <div class="post-heading-info-name">
                               <span>Chiến Duy</span>
                               <ion-icon name="checkmark-circle-sharp"></ion-icon>
                           </div>
                           <div class="post-heading-time">
                               <span>${value.time}</span>
                               <ion-icon name="earth-sharp"></ion-icon>
                           </div>
                       </div>
                   </div>

                   <div class="post-heading-toggle" id="post-heading-toggle">
                       <ion-icon name="ellipsis-horizontal-sharp"></ion-icon>

                       <div class="post-heading-toggle-action" id="post-heading-toggle-action">
                           <div class="post-heading-toggle-item"
                           onclick="handleDeletePost(${index})"
                           >
                               <ion-icon name="trash-outline"></ion-icon>
                               <span>Xoá bài đăng</span>
                           </div>
                           <div class="post-heading-toggle-item" 
                            onclick="handelEditPost(${index})"
                            data-toggle="modal" data-target="#exampleModal"
                            >
                               <ion-icon name="create-outline"></ion-icon>
                               <span>Chỉnh sửa bài đăng</span>
                           </div>

                           <hr class="line-1">
                           <div class="post-heading-toggle-item">
                               <ion-icon name="navigate-outline"></ion-icon>
                               <span>Gim bài đăng</span>
                           </div>
                           <div class="post-heading-toggle-item">
                               <ion-icon name="code-slash-outline"></ion-icon>
                               <span>Nhúng</span>
                           </div>
                       </div>
                   </div>

               </div>

               <div class="post-content">
                   <div class="post-content-text">
                       ${value.text}
                   </div>
                   <div class=${
                     value.image === "" ? "d-none" : "post-content-image"
                   }>
                       <img src=${value.image}
                           alt="">
                   </div>
               </div>

               <div class="post-action">
                   <div class="post-action-top">
                       <div class="post-action-like">
                           <div class="post-action-like-button">
                               <img src="./assets/img/like.svg" alt="">
                               <img src="./assets/img/haha.svg" alt="">
                           </div>
                           <span>5.3k</span>
                       </div>

                       <div class="post-action-share">
                           <div class="post-action-text">
                               360 bình luận
                           </div>
                           <div class="post-action-text">
                               6 lượt chia sẽ
                           </div>
                       </div>
                   </div>
                   <hr class="line-2">
                   <div class="post-action-button">
                       <div class="post-action-button-item">
                           <ion-icon name="thumbs-up-outline"></ion-icon>
                           <span>Thích</span>
                       </div>
                       <div class="post-action-button-item">
                           <ion-icon name="chatbox-outline"></ion-icon>
                           <span>Bình luận</span>
                       </div>
                       <div class="post-action-button-item">
                           <ion-icon name="arrow-redo-outline"></ion-icon>
                           <span>Chia sẽ</span>
                       </div>

                   </div>

               </div>
           </div>`;
  });

  postHtml.innerHTML = html.split(",");
};
