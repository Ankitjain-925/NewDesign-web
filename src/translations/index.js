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


const getLanguage = (languageType) => {
    switch (languageType) {
        case "en":
            return translationEN.text
            break;
        case "de":
            return translationDE.text
            break;
        case "pt":
            return translationPT.text
            break;
        case "sp":
            return translationSP.text
            break;
        case "rs":
            return translationRS.text
            break;
        case "nl":
            return translationNL.text
            break;
        case "ch":
            return translationCH.text
            break;
        case "sw":
            return translationSW.text
            break;
        case "fr":
            return translationFR.text
            break;
        case "ar":
            return translationAR.text
            break;
        default:
            return translationEN.text
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