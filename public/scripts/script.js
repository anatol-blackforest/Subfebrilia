window.onload = function(){

  const remover = document.getElementsByClassName("remover");
  const modal = document.getElementById("modal");
  const upload = document.getElementById("upload");
  const title = document.getElementById("title");
  const about = document.getElementById("about");
  const search = document.getElementById("search");
  const inputSearch = document.getElementById("inputSearch"); 
  const addfilm = document.getElementById("addfilm");
  
  let enabled_post = true;
  let enabled_edit = true;

  document.addEventListener("click", function(e){
    if(e.target.dataset.delete){
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/${e.target.dataset.delete}`, true);
        xhr.send();
        xhr.onreadystatechange = function() { 
          location.href = "/"
        }
    }
  });

  document.addEventListener("submit", function(e){
    if(e.target.dataset.change){
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', `/${e.target.dataset.change}/${e.target.firstElementChild.value}`, true);
        xhr.send();
        xhr.onreadystatechange = function() { 
          location.href = "/"
        }
    }
  });

}