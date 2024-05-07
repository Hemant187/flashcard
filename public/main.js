

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openReview() {
  window.location.href = '../card/review'
  document.getElementById("myReview").style.display = "block";
}
const cards = document.querySelectorAll('.card')
Array.from(cards).forEach((el)=>{
  el.addEventListener('click', redirectToEdit)
})

async function redirectToEdit(){
  const todoId = await this.dataset.id
  console.log('todo',todoId)
  window.location.href = `/card/edit/${todoId}`
}

function startReview() {
  window.location.href = '../card/review'
  fetch('card/review/cards') // Replace with your endpoint for fetching cards
    .then(response => {
      response.status(200).json();
    })
    .then(cards => {
      console.log(cards)
      let currentCardIndex = 0;

      function displayCardFront(card) {
        const reviewArea = document.getElementById('review-area');
        reviewArea.innerHTML = `
          <%- include('./card-front.ejs', { card }) %>
          <button id="flip-button">Flip</button>
        `;
        document.getElementById('flip-button').addEventListener('click', () => {
          displayCardBothSides(card);
        });
      }

      function displayCardBothSides(card) {
        const reviewArea = document.getElementById('review-area');
        reviewArea.innerHTML = `
          <%- include('./card-both-sides.ejs', { card }) %>
        `;
        document.getElementById('easy-button').addEventListener('click', () => {
          updateCardScore(card.id, 0);
          currentCardIndex++;
          if (currentCardIndex < cards.length) {
            displayCardFront(cards[currentCardIndex]);
          } else {
            // Review session completed
            reviewArea.innerHTML = 'Review completed!';
          }
        });
        document.getElementById('hard-button').addEventListener('click', () => {
          updateCardScore(card.id, 1);
          currentCardIndex++;
          if (currentCardIndex < cards.length) {
            displayCardFront(cards[currentCardIndex]);
          } else {
            // Review session completed
            reviewArea.innerHTML = 'Review completed!';
          }
        });
      }

      displayCardFront(cards[currentCardIndex]);
    });
  }