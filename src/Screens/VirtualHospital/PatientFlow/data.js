import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"

export const authors = [{ step_name: "Step2" }, { step_name: "Step3" }, {step_name: "Step1"}];



export const quotes = [
  {
    profile_id: "N_e8UMT78xT",
    name: "hfghfgh",
    author: authors[0],
    url: "http://adventuretime.wikia.com/wiki/Jake",
    step_id: "1111122232332"
   
  },
  {
    profile_id: "N_e98MTIOxT",
    name: "fhfhfh",
    author:  authors[2],
    url: "http://adventuretime.wikia.com/wiki/Jake",
    step_id: "1111125237532"
   
  },
  {
    profile_id: "N_e8UMTI66T",
    name: "erwerwer",
    author:  authors[2],
    url: "http://adventuretime.wikia.com/wiki/bmo",
    step_id: "1111125237532"
  },
  {
    profile_id: "N_e1UMTIOxT",
    name: "rwerwer",
    author: authors[1],
    url: "http://adventuretime.wikia.com/wiki/Jake",
    step_id: "1111125237532"
  },
  {
    profile_id: "N_e8UMT-OxT",
    name: "khjkhjk",
    author: authors[2],
    url: "http://adventuretime.wikia.com/wiki/Jake",
    step_id: "1111125237532"
  },
  {
    profile_id: "N_e8UMTIOxT",
    name: "Ankita",
    author: authors[0],
    url: "http://adventuretime.wikia.com/wiki/Jake",
    house_id: "dfsdfsdf3434",
    step_id: "1111125237532"
  },
 
];

const getByAuthor = (author, items) =>
  items.filter(quote => quote.author === author);

export const getSteps = async (house_id, user_token)=> {
  let response = await axios.get(sitedata.data.path + "/step/GetStep/" + house_id,
        commonHeader(user_token))
    if (response.data.hassuccessed === true) {
        return response.data.data
    } else {
        return false
    }
}
export const authorQuoteMap = authors.reduce(
  (previous, author) => ({
    ...previous,
    [author.step_name]: getByAuthor(author, quotes)
  }),
  {}
);
