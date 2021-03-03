const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)')

const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
const currencyEl_one = document.getElementById('currency-one')
populateUI()

let ticketPrice = +movieSelect.value;

function calculate(currency_one){
   var currencyDefault = "USD"

   return fetch(`https://api.exchangerate-api.com/v4/latest/${currencyDefault}`)
   .then(res =>res.json())
   .then(data =>  {
     const rate = data.rates[currency_one];
     var resultado = (10 * rate).toFixed(2);
     return resultado
   }).catch(function(err) {
    document.write(err);
});
}

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
function updateSelectedCount(){
    const seletedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...seletedSeats].map(seat =>[...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
 

    const selectedSeatsCount = seletedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });

        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
        if(selectedMovieIndex !== null){
            movieSelect.selectedIndex = selectedMovieIndex;
        }
    }

  }
  
  function CargarPeliculas(value) {

          var sel = document.getElementById("movie");
          result1 = calculate(value)
          console.log(value)
         
             var options = `<option value="1"> Avengers:Endgame ${result1}</option>`;
      
           sel.innerHTML = options;
         }
 

currencyEl_one.addEventListener('change', e =>{
    ticketPrice = +e.target.value;
setMovieData(e.target.selectedIndex, e.target.value)
console.log(e.target.value)

    updateSelectedCount();
    CargarPeliculas(e.target.value)
})
container.addEventListener('click', (e) =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount()
    }
});
updateSelectedCount()
var resultado = calculate("EUR").then(data => data)
console.log(resultado)
