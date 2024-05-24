const Cards = require('../model/card.model')

const getCard = async (req, res) => {
  try {
    if(req.user){
      const cards = await Cards.find({userId: req.user.id })
      res.render('index.ejs', { card: cards , user:req.user }) 
    }else{
      return res.redirect('/login')
    }
  } catch (err) {
    console.error(err);
  }
}
const sendCard = async (req, res) => {
  try {
    if(req.user){
      const cards = await Cards.find({userId: req.user.id })
      res.status(200).json(cards);
    }else{
      return res.redirect('/login')
    }
  } catch (err) {
    console.error(err);
  }
}
const getReview = async (req, res) => {
  try {
    if(req.user){
      const cards = await Cards.find({userId: req.user.id }).sort({score: 1})
      // console.log(cards)
      res.render('review.ejs', { card: cards }) 
    }else{
      return res.redirect('/login')
    }
  } catch (err) {
    console.error(err);
  }
}

const createCard = async (req, res) => {
  try {
    const card = await Cards.create({front: req.body.front, back: req.body.back, userId: req.user.id})
    res.redirect('../card')
  } catch (err) {
    console.error(err);
  }
}

const editCard = async (req, res) => {
  try {
    if(req.user){
      const cards = await Cards.find({userId: req.user.id })
      const selectedCard = await Cards.findById({_id: req.params.id})
      res.render('edit.ejs', { card: cards, sCard: selectedCard, cardid: req.params.id}) 
    }else{
      return res.redirect('/login')
    }
  } catch (err) {
    console.error(err);
  }
}

const updateCard = async (req, res) => {
  try {
      const cardid = req.params.id;
      const updatedCard = await Cards.findByIdAndUpdate(cardid, req.body );
      // Optionally, you can check if the card was found and updated successfully
      if (!updatedCard) {
          return res.status(404).send('Card not found');
      }
      
      // Redirect to the homepage or send a response indicating success
      res.redirect('/card');
  } catch (error) {
      // Handle errors (e.g., database errors)
      console.error('Error updating card:', error);
      res.status(500).send('Error updating card');
  }
}

const updateScore = async (req, res) => {
  try {
    const { flashcardId, feedback } = req.body;
    console.log(req.body)
    const flashcard = await Cards.findById(flashcardId);

    if (!flashcard) {
      return res.status(404).send('Flashcard not found');
    }

    flashcard.score += Number(req.body.feedback)
    await flashcard.save();

    res.status(200).json({ message: 'Feedback updated successfully' });
  } catch (err) {
    console.error('Error handling feedback:', err);
    res.status(500).send('Internal Server Error');
  }
}

const deleteCard = async (req, res) => {
  try {
    const cardid = req.params.id;
    const deleteCard = await Cards.findOneAndDelete({ _id: cardid })
    // Optionally, you can check if the card was found and updated successfully
    if (!deleteCard) {
        return res.status(404).send('Card not found');
    }
    res.redirect('/card')
    // Redirect to the homepage or send a response indicating success
    // res.redirect('/');
    } catch (error) {
        // Handle errors (e.g., database errors)
        console.error('Error updating card:', error);
        res.status(500).send('Error updating card');
    }
}

module.exports = { getCard, createCard, editCard, updateCard, deleteCard, getReview, sendCard, updateScore}
