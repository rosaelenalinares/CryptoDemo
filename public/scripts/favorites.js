//DELETE FAVORITES
const DeleteFavorites = (coin) => {
    fetch('/api/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coin),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};



const EventtoDeleteFavorites = (coins) => {
    coins.forEach((coin) => {
        coin.addEventListener('click', (e) => {
            DeleteFavorites({ favorites_id: coin.dataset.id })
            alert('You have removed it from your favorites')
        })
    })
};


const allcoins = () => {
    let allcoins = document.querySelectorAll('.each-one')
    console.log(allcoins)
    EventtoDeleteFavorites(allcoins)
};


//GET FAVORITES FROM DB
const comments = document.getElementById('btn-favorites');
comments.addEventListener('click', (e) => {
    e.preventDefault()
    const getFavoriteFromdb = () => {
        fetch('/api/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                container.innerHTML = ""
                data.data.forEach((data) => {
                    let poster = `<tr class="each-one" data-id=${data.favorites_id} id=${data.imdbID}>
                                    <td scope="row">${data.rank}</td>
                                    <td><img width="30px" src="${data.icon}"/></td>
                                    <td>${data.name}</td>
                                    <td>${data.symbol}</td>
                                    <td>${data.price}</td>
                                    <td>${data.MarketCap}</td>
                                    </tr>`
                    container.insertAdjacentHTML('beforeend', poster)
                })
                allcoins()
            })
            .catch((error) => {
                // console.error('Error:', error);
            });
    };
    getFavoriteFromdb()
});