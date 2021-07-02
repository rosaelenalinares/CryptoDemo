let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const cosito = document.querySelector('.card')
function Noticias() {
    fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=a155dab27077f15ef75f20fa03f34da03348ed90611306c3765f32d61297fab6", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            // cosito.innerHTML = ""
            data.Data.forEach((data) => {

                const contenido = `<div class="row g-0 mb-5">
                                    <div class="col-md-4">
                                    <img src="${data.imageurl}" class="img-fluid rounded-start" style="width: 40%; margin-left: 50px">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">${data.title}</h5>
                                            <p class="card-text" style="text-align: justify">${data.body}</p>
                                            <p class="card-text"><small class="text-muted">${data.categories}</small></p>
                                            <a href="${data.guid}" class="btn btn-primary">Read this article</a>
                                        </div>
                                    </div>
                                 </div>`
    
                    cosito.insertAdjacentHTML('beforeend', contenido)
            });
        });
}
Noticias()