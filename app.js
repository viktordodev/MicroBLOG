import {easyhttp} from './http';
import {ui} from './ui';

//Add posts on initial Load
document.addEventListener('DOMContentLoaded', loadPosts);

//Add Post on button add
document.querySelector('#submit').addEventListener('click',addPost);

//Edit Post E Listener
document.querySelector('#posts').addEventListener('click',editPost);


function loadPosts(){
    easyhttp.get('http://localhost:3000/posts')
    .then(function(data){
   ui.showPosts(data);
    })
    .catch(function(err){
        console.log(err)
    })
}

function addPost(e){
     let title = document.getElementById('title').value;
     let body = document.getElementById('body').value;
     let id = document.getElementById('id').value;
     

     let data = {
         title,
         body
     }

    // New Post Submit
     if(e.target.classList.contains('post-submit')){
         easyhttp.post('http://localhost:3000/posts',data)
     .then(function(){
         loadPosts();
         ui.clearFields();
         ui.alert('Post Added', 'success');
         setTimeout(function(){
         ui.fadeOutAlert();
         },3000);
         setTimeout(function(){
             ui.clearAlert();
             },5000);
     });}

     //Edit Submit Post
     else if(e.target.classList.contains('edit-submit')){
        easyhttp.put(`http://localhost:3000/posts/${id}`,data)
        .then(function(data){
            ui.clearState(data.id);
            loadPosts();
            ui.clearFields();
            ui.alert('Post Changed', 'success');

            setTimeout(function(){
            ui.fadeOutAlert();
            },3000);
            setTimeout(function(){
                ui.clearAlert();
                },5000);
        });
       
     }
    
}




function editPost(e) {
    let id = e.target.parentElement.parentElement.id;
   if(e.target.classList.contains('edit-post')){
      
       ui.editPostState(id);
       e.preventDefault();
   }
   else if(e.target.classList.contains('delete-post')){
    
    easyhttp.delete(`http://localhost:3000/posts/${id}`);
    setTimeout(function(){
        loadPosts();;
        },100);  
   }
   ui.alert('Post Deleted', 'danger');

            setTimeout(function(){
            ui.fadeOutAlert();
            },3000);

            setTimeout(function(){
                ui.clearAlert();
                },5000);
        
}