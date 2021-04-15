import * as translationEN from "./en.json";
import * as translationDE from "./de.json";
import * as translationSP from "./sp.json";
import * as translationPT from "./pt.json";
import * as translationRS from "./rs.json";
import * as translationNL from "./nl.json";
import * as translationCH from "./ch.json";
import * as translationSW from "./sw.json";
import * as translationFR from "./fr.json";
import * as translationAR from "./ar.json";


const getLanguage =(lang)=>{
    let translate = {};
    switch (lang) {
      case "en":
        return translate = translationEN.text;
        break;
      case "de":
        return translate = translationDE.text;
        break;
      case "pt":
        return translate = translationPT.text;
        break;
      case "sp":
        return translate = translationSP.text;
        break;
      case "rs":
        return translate = translationRS.text;
        break;
      case "nl":
        return translate = translationNL.text;
        break;
      case "ch":
        return translate = translationCH.text;
        break;
      case "sw":
        return translate = translationSW.text;
        break;
      case "fr":
        return translate = translationFR.text;
        break;
      case "ar":
        return translate = translationAR.text;
        break;
      default:
        return translate = translationEN.text;
    }
}

export {
    getLanguage,
    translationAR,
    translationSW,
    translationSP,
    translationRS,
    translationEN,
    translationNL,
    translationDE,
    translationCH,
    translationPT,
    translationFR
} 