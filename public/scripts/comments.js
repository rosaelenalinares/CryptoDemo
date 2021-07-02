// //SEND COMMENTS TO SERVER
const addpostbtn = document.querySelector('#post-agregar')
const Comment_Container = document.getElementById('Allcomments')



addpostbtn.addEventListener('click', (e) => {
    let inputFromTheUser = document.getElementById('Comment-Input')
    Comment_Container.insertAdjacentHTML('beforeend', `<div class="col-md-6" style="width: 100%">
              <div class="widget-area no-padding blank">
                <div class="status-upload">
            <form>
                        <textarea>${inputFromTheUser.value}</textarea>
                        <ul>
                          <li><a id="delete" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete"><i class="fas fa-trash-alt"></i></a></li>
                        </ul>
                        <button type="submit" class="btn btn-success green"><i class="fa fa-share"></i>Reply</button>
                      </form>
                      </div>
              </div>
            </div>`)
    addcomments({ input: inputFromTheUser.value })
    inputFromTheUser.value = "";
});

//ADD COMMENTS TO DB
const addcomments = (comment) => {
    fetch('/api/addcomments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            //   console.error('Error:', error);
        });
};



//DELETE COMMENTS
const DeleteComments = (comment) => {
    fetch('/api/deletecomments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const selectAllComments = () => {
    allcomments = document.querySelectorAll('.each-comment')
    console.log(allcomments)
    EventtoDeleteComments(allcomments)
    // EventtoReplyComments(allcomments)
};

const EventtoDeleteComments = (comments) => {
    comments.forEach((comment) => {
        comment.children[1].addEventListener('click', (event) => {
            DeleteComments({ comments_id: comment.dataset.id })
            comment.remove()
            alert('You have deleted your comment')
        })
    })
};

//ADD REPLY TO DB
// const addreply = (reply) => {
//     fetch('/api/addreply', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(reply),
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//         })
//         .catch((error) => {
//             //   console.error('Error:', error);
//         });
// };


// const EventtoReplyComments = (comments) => {
//     comments.forEach((comment) => {
//         comment.children[2].addEventListener('click', (event) => {
//             // openreply()
//             alert('hello')
//         });
//     });
// };

// const openreply = () => {
//     let conten = document.querySelector('#conten')
//             conten.insertAdjacentHTML('beforeend', `<div class="col-md-6" style="width: 100%">
//             <div class="widget-area no-padding blank">
//             <div class="status-upload">
//                 <form>
//                             <textarea></textarea>
//                             <ul>
//                                 <li><a id="delete" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete"><i class="fas fa-trash-alt"></i></a></li>
//                             </ul>
//                             <button type="submit" class="btn btn-success green"><i class="fa fa-share"></i>Post</button>
//                             </form>
//                             </div>
//                     </div>
//                 </div>`)
// }



//GET COMMENTS FROM DB
const fetchCommentsFromDB = () => {
    fetch('/api/getcomments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            data.data.forEach((data) => {
                Comment_Container.insertAdjacentHTML('beforeend', `
                <div class="row">
                <div class="col-md-6" style="width: 100%">
                <div id="conten" class="widget-area no-padding blank">
                <div class="status-upload">
                <form class="each-comment" data-id=${data.comments_id} id=${data.imdbID}>
                        <div class="textarea">${data.content}</div>
                        <ul>
                          <li><a id="delete" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete"><i class="fas fa-trash-alt"></i></a></li>
                        </ul>
                        <button id="reply" type="submit" class="btn btn-success green"><i class="fa fa-share"></i>Reply</button>
                </form>
                </div>
                </div>
                </div>
                </div>`)
            })
            selectAllComments()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};
fetchCommentsFromDB()