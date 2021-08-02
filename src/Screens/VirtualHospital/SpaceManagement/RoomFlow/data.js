export const authors = [{ name: "Room1" }, { name: "Room2" }, {name: "Room3"}, {name: "Room4"}];

export const quotes = [
  {
    profile_id: "N_e8UMT78xT",
    name: "hfghfgh",
    author: authors[0],
    url: "http://adventuretime.wikia.com/wiki/Jake", 
  },
  {
    profile_id: "N_e98MTIOxT",
    name: "fhfhfh",
    author:  authors[2],
    url: "http://adventuretime.wikia.com/wiki/Jake",  
  },
  {
    profile_id: "N_e8UMTI66T",
    name: "erwerwer",
    author:  authors[2],
    url: "http://adventuretime.wikia.com/wiki/bmo",
  },
  {
    profile_id: "N_e1UMTIOxT",
    name: "rwerwer",
    author: authors[1],
    url: "http://adventuretime.wikia.com/wiki/Jake",
  },
  {
    profile_id: "N_e8UMT-OxT",
    name: "khjkhjk",
    author: authors[2],
    url: "http://adventuretime.wikia.com/wiki/Jake",
  },
  {
    profile_id: "N_e8UMTIOxT",
    name: "Ankita",
    author: authors[0],
    url: "http://adventuretime.wikia.com/wiki/Jake",
  },
  {
    profile_id: "N_e8UMTIOxT",
    name: "ggfdgdfgf",
    author: authors[3],
    url: "http://adventuretime.wikia.com/wiki/Jake",
  },
];

const getByAuthor = (author, items) =>
  items.filter(quote => quote.author === author);

export const authorQuoteMap = authors.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes)
  }),
  {}
);
