let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});

document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  document.querySelector("#flashcards").innerHTML = '';
  contentArray = [];
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.querySelector(".create_card").style.display = "block";
});

document.getElementById("close_card_box").addEventListener("click", () => {
  document.querySelector(".create_card").style.display = "none";
});

contentArray.forEach((item, index) => {
  flashcardMaker(item, index);
});

function flashcardMaker(text, delThisIndex) {
  const flashcard = document.createElement("div");
  const question = document.createElement('h2');
  const answer = document.createElement('h2');
  const del = document.createElement('i');

  flashcard.className = 'flashcard';

  question.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
  question.textContent = text.my_question;

  answer.setAttribute("style", "text-align:center; display:none; color:red");
  answer.textContent = text.my_answer;

  del.className = "fas fa-minus";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    document.querySelector("#flashcards").innerHTML = '';
    contentArray.forEach((item, index) => {
      flashcardMaker(item, index);
    });
  });

  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);

  flashcard.addEventListener("click", () => {
    if(answer.style.display == "none")
      answer.style.display = "block";
    else
      answer.style.display = "none";
  });

  document.querySelector("#flashcards").appendChild(flashcard);
}

function addFlashcard() {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");

  let flashcard_info = {
    'my_question': question.value,
    'my_answer': answer.value
  }

  contentArray.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  flashcardMaker(flashcard_info, contentArray.length - 1);
  question.value = "";
  answer.value = "";
}
