import weatherQuote from '../../templates/quote.hbs';

export default renderQuoteInformer;

//Array of weather quotes

const quotes = [
  {
    number: 1,
    citation: 'You are the sky. Everything else – it’s just the weather.',
    author: 'Pema Chödrön',
  },
  {
    number: 2,
    citation: 'Wherever you go, no matter what the weather, always bring your own sunshine.',
    author: "Anthony J. D'Angelo",
  },
  {
    number: 3,
    citation: 'If you want to see the sunshine, you have to weather the storm.',
    author: 'Frank Lane',
  },
  {
    number: 4,
    citation: 'In the Spring, I have counted 136 different kinds of weather inside of 24 hours.',
    author: 'Mark Twain',
  },
  {
    number: 5,
    citation:
      'Whenever people talk to me about the weather, i always feel certain that they mean something else.',
    author: 'Oscar Wilde',
  },
  {
    number: 6,
    citation: 'My style varies on my mood or the weather of the day.',
    author: 'Jennie',
  },
  {
    number: 7,
    citation: 'There is no such thing as bad weather, only different kinds of good weather.',
    author: 'John Ruskin',
  },
  {
    number: 8,
    citation: 'A change in the weather is sufficient to recreate the world and ourselves.',
    author: 'Marcel Proust',
  },
  {
    number: 9,
    citation: 'Bad weather always looks worse through a window.',
    author: 'Tom Lehrer',
  },
  {
    number: 10,
    citation: 'The weather is the weather. You have to deal with whatever is out there.',
    author: 'Matt Cassel',
  },
  {
    number: 11,
    citation: 'Everybody talks about the weather, but nobody does anything about it.',
    author: 'Charles Dudley Warner',
  },
  {
    number: 12,
    citation: 'It is only in sorrow bad weather masters us; in joy we face the storm and defy it.',
    author: 'Amelia Barr',
  },
  {
    number: 13,
    citation: 'In fair weather prepare for foul.',
    author: 'Thomas Fuller',
  },
  {
    number: 14,
    citation: "I'm not into cold weather, I like warm weather.",
    author: 'Amos Lee',
  },
  {
    number: 15,
    citation: "It doesn't matter what people say about me, I weather the storm.",
    author: 'Terrell Owens',
  },
  {
    number: 16,
    citation: 'The weather is perfect. The gods are shining on us.',
    author: 'Frank Shorter',
  },
  {
    number: 17,
    citation:
      'The threat from extreme weather events highlights the importance of investing in preparedness.',
    author: 'Sheri Fink',
  },
  {
    number: 18,
    citation: "One can't predict the weather more than a few days in advance.",
    author: 'Stephen Hawking',
  },
  {
    number: 19,
    citation: 'Apartheid does not happen spontaneously, like bad weather conditions.',
    author: 'Jonathan Kozol',
  },
  {
    number: 20,
    citation: "There's no such thing as bad weather, only inappropriate clothing",
    author: 'Ranulph Fiennes',
  },
  {
    number: 21,
    citation: 'Bad weather always looks worse through a window.',
    author: 'Tom Lehrer',
  },
  {
    number: 22,
    citation: 'Conversation about the weather is the last refuge of the unimaginative.',
    author: 'Oscar Wilde',
  },
  {
    number: 23,
    citation:
      "You can't get mad at weather because weather's not about you. Apply that lesson to most other aspects of life.",
    author: 'Douglas Coupland',
  },
  {
    number: 24,
    citation: "One can't predict the weather more than a few days in advance.",
    author: 'Stephen Hawking',
  },
  {
    number: 25,
    citation:
      'When all is said and done, the weather and love are the two elements about which one can never be sure.',
    author: 'Alice Hoffman, Here on Earth',
  },
  {
    number: 26,
    citation:
      'We may have bad weather in Ireland, but the sun shines in the hearts of the people and that keeps us all warm.',
    author: 'Marianne Williamson',
  },
  {
    number: 27,
    citation: 'A change in the weather is sufficient to recreate the world and ourselves.',
    author: 'Marcel Proust',
  },
  {
    number: 28,
    citation: 'Climate is what we expect, weather is what we get',
    author: 'Mark Twain',
  },
  {
    number: 29,
    citation: 'My style varies on my mood or the weather of the day.',
    author: 'Jennie',
  },
  {
    number: 30,
    citation: 'After three days men grow weary, of a wench, a guest, and weather rainy.',
    author: 'Benjamin Franklin',
  },
  {
    number: 31,
    citation: 'Weather forecast for tonight: dark.',
    author: 'Travis Bradberry',
  },
  {
    number: 32,
    citation: "There's no such thing as bad weather, just soft people.",
    author: 'Bill Bowerman',
  },
  {
    number: 33,
    citation: 'Conversation about the weather is the last refuge of the unimaginative.',
    author: 'Oscar Wilde',
  },
];

function renderQuoteInformer() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const markupQuote = weatherQuote(randomQuote);
  document.querySelector('.quote-section').insertAdjacentHTML('beforeend', markupQuote);
}

/* должен содержать функции:
- renderQuoteInformer
- getQuote

функция renderQuoteInformer:
принимает:
- объект с референсами ( элемент текста цитаты, элемент имя автора )
- объект-цитату с данными для отображения: текст цитаты, имя автора
и делает:
- обновляет цитату, устанавливая требуемые имя автора и текст цитаты

функция getQuote
принимает
- функцию API сервиса, которую вызывать
- возвращает - объект цитаты, полученный от сервиса (содержит текст цитаты, имя автора)

 */
