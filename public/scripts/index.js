// FRONT END FILE TO INTERACT WITH THE DOM
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
let container = document.querySelector('.mini-content')



function CrytoPrices() {
    fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=50&currency=USD", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            // container.innerHTML = ""
            data.coins.forEach((coin) => {

                const mini_content = `<tr class="favorites" id=${coin.imdbID}>
                                        <td scope="row">${coin.rank}</td>
                                        <td><img width="30px" src="${coin.icon}"/></td>
                                        <td>${coin.name}</td>
                                        <td>${coin.symbol}</td>
                                        <td>${coin.price}</td>
                                        <td>${coin.marketCap}</td>
                                        </tr>`
                container.insertAdjacentHTML('beforeend', mini_content);

                const FavoritesBtn = document.getElementById(`${coin.imdbID}`);
                FavoritesBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    fetch('/api/addfavorites', {
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
                            // console.error('Error:', error);
                        });
                    alert("Added to favorites");
                });

            });
        });
}
CrytoPrices()