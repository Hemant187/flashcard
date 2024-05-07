function startReview() {
  fetch('card/review/cards') // Replace with your endpoint for fetching cards
    .then(response => response.json())
    .then(cards => {
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