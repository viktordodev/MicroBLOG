import { easyhttp } from "./http";

class UI {
    constructor() {
        this.id = document.getElementById('id');
        this.postsP = document.getElementById('posts');
        this.inputTitle = document.getElementById('title');
        this.inputBody = document.getElementById('body');

    }
     //Load Posts into UI
    showPosts(data) {

        let prepContent = '';
        data.forEach(function (post) {
            prepContent += `<div id="${post.id}" class="card p-1 mb-2" style="width: 100%;">
     <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${post.body}</p>
    <a href="#" class="edit-post btn btn-primary ">Edit Post</a>
    <a href="#" class="delete-post btn btn-danger">Delete Post</a>
  </div>
     </div>`
        });
        this.postsP.innerHTML = prepContent;


    }

    //Edit Post

    editPostState(id) {

        let cards = document.querySelectorAll('.card');
        console.log(cards)

        cards.forEach(function (item) {
            if (item.classList.contains('bg-warning')) {
                item.classList.remove('bg-warning');
            }
        })



        easyhttp.get(`http://localhost:3000/posts/${id}`)
            .then(function (post) {


                document.getElementById('id').value = post.id;
                document.getElementById('title').value = post.title;
                document.getElementById('body').value = post.body;
                let card = document.getElementById(id);
                card.classList.add('bg-warning')
                let btn = document.querySelector('#submit');
                btn.textContent = 'Edit Post';
                btn.classList = 'edit-submit btn btn-info btn-block'
            })


    }

    //Clear State
    clearState(id) {
        let card = document.getElementById(id);
        card.classList.remove('bg-warning')
        let btn = document.querySelector('.edit-submit');
        btn.textContent = 'Add Post';
        btn.classList = 'post-submit btn btn-primary btn-block'
    }

    //Clear Input fields
    clearFields() {
        this.inputTitle.value = '';
        this.inputBody.value = ''
    }

    //Alert Msg
    alert(msg, cls) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(msg));
        div.classList = `alert alert-${cls} m-2`;
        let card = document.getElementById('card-form');
        let B = document.querySelector('.form-end');
        card.insertBefore(div, B)
    }
    
    fadeOutAlert() {
        document.querySelector('.alert').classList.add('fadeout');
    }
    clearAlert() {
        document.querySelector('.alert').remove();
    }

}


export const ui = new UI();