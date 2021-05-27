import weatherQuote from '../../templates/quote.hbs';

//Array of weather quotes

const quotes = [
  {
    number: 1,
    text: "People often say that motivation doesn't last. Well, neither does bathing -- that's why we recommend it daily.",
    author: 'Zig Ziglar',
  },
  {
    number: 2,
    text: 'Someday is not a day of the week.',
    author: 'Denise Brennan-Nelson',
  },
  {
    number: 3,
    text: 'Hire character. Train skill.',
    author: 'Peter Schutz',
  },
  {
    number: 4,
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: 'Steve Jobs',
  },
  {
    number: 5,
    text: 'Sales are contingent upon the attitude of the salesman -- not the attitude of the prospect.',
    author: 'W. Clement Stone',
  },
  {
    number: 6,
    text: 'Everyone lives by selling something.',
    author: 'Robert Louis Stevenson',
  },
  {
    number: 7,
    text: 'If you are not taking care of your customer, your competitor will.',
    author: 'Bob Hooey',
  },
  {
    number: 8,
    text: "The golden rule for every businessman is this: Put yourself in your customer's place.",
    author: 'Orison Swett Marden',
  },
  {
    number: 9,
    text: 'If you cannot do great things, do small things in a great way.',
    author: 'Napoleon Hill',
  },
  {
    number: 10,
    text: 'The best leaders are those most interested in surrounding themselves with assistants and associates smarter than they are. They are frank in admitting this and are willing to pay for such talents.',
    author: 'Antos Parrish',
  },
  {
    number: 11,
    text: "Beware of monotony; it's the mother of all the deadly sins.",
    author: 'Edith Wharton',
  },
  {
    number: 12,
    text: 'Nothing is really work unless you would rather be doing something else.',
    author: 'J.M. Barrie',
  },
  {
    number: 13,
    text: "Without a customer, you don't have a business -- all you have is a hobby.",
    author: 'Don Peppers',
  },
  {
    number: 14,
    text: "To be most effective in sales today, it's imperative to drop your 'sales' mentality and start working with your prospects as if they've already hired you.",
    author: 'Jill Konrath',
  },
  {
    number: 15,
    text: "Pretend that every single person you meet has a sign around his or her neck that says, 'Make me feel important.' Not only will you succeed in sales, you will succeed in life.",
    author: 'Mary Kay Ash',
  },
  {
    number: 16,
    text: "It's not just about being better. It's about being different. You need to give people a reason to choose your business.",
    author: 'Tom Abbott',
  },
  {
    number: 17,
    text: 'Being good in business is the most fascinating kind of art. Making money is art and working is art and good business is the best art.',
    author: 'Andy Warhol',
  },
  {
    number: 18,
    text: "Be patient with yourself. Self-growth is tender; it's holy ground. There's no greater investment.",
    author: 'Stephen Covey',
  },
  {
    number: 19,
    text: 'Without hustle, talent will only carry you so far.',
    author: 'Gary Vaynerchuk',
  },
  {
    number: 20,
    text: "Working hard for something we don't care about is called stressed; working hard for something we love is called passion.",
    author: 'Simon Sinek',
  },
  {
    number: 21,
    text: "I'd rather regret the things I've done than regret the things I haven't done.",
    author: 'Lucille Ball',
  },
  {
    number: 22,
    text: "I didn't get there by wishing for it or hoping for it, but by working for it.",
    author: 'Estée Lauder',
  },
  {
    number: 23,
    text: 'Always do your best. What you plant now, you will harvest later.',
    author: 'Og Mandino',
  },
  {
    number: 24,
    text: "The key to life is accepting challenges. Once someone stops doing this, he's dead.",
    author: 'Bette Davis',
  },
  {
    number: 25,
    text: 'Move out of your comfort zone. You can only grow if you are willing to feel awkward and uncomfortable when you try something new.',
    author: 'Brian Tracy',
  },
  {
    number: 26,
    text: 'Challenges are what make life interesting and overcoming them is what makes life meaningful.',
    author: 'Joshua J. Marine',
  },
  {
    number: 27,
    text: "Don't let the fear of losing be greater than the excitement of winning.",
    author: 'Robert Kiyosaki',
  },
  {
    number: 28,
    text: 'How dare you settle for less when the world has made it so easy for you to be remarkable?',
    author: 'Seth Godin',
  },
  {
    number: 29,
    text: 'Energy and persistence conquer all things.',
    author: 'Benjamin Franklin',
  },
  {
    number: 30,
    text: 'Perseverance is failing 19 times and succeeding the 20th.',
    author: 'Julie Andrews',
  },
  {
    number: 31,
    text: "Grit is that ‘extra something' that separates the most successful people from the rest. It's the passion, perseverance, and stamina that we must channel in order to stick with our dreams until they become a reality.",
    author: 'Travis Bradberry',
  },
  {
    number: 32,
    text: 'Failure after long perseverance is much grander than never to have a striving good enough to be called a failure.',
    author: 'George Eliot',
  },
  {
    number: 33,
    text: 'The secret of joy in work is contained in one word -- excellence. To know how to do something well is to enjoy it.',
    author: 'Pearl Buck',
  },
];

function renderRandomQuote() {
  const quoteTextRef = document.querySelector('.quote-text');
  const quoteAuthorRef = document.querySelector('.quote-author');

  const element = quotes[Math.floor(Math.random() * quotes.length)];

  quoteTextRef.textContent = element.text;
  quoteAuthorRef.textContent = element.author;
}

renderRandomQuote();

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

пример объекта референсов:
const citySelectorRefs = {
 searchForm = document.querySelector('.search-form');
 searchInput = document.querySelector('.search-location__form');
};
 */
