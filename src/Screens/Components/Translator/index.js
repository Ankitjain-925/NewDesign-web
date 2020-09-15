
import * as translationEN from '../../../translations/en';
import * as translationDE from '../../../translations/de';
import * as translationES from '../../../translations/es';
import * as translationCH from '../../../translations/ch';
import * as translationPT from '../../../translations/pt';

export default function translate(translated_word, stateLanguageType) {
    return stateLanguageType=='German'?translationDE.text[translated_word]:stateLanguageType=='Spanish'?translationES.text[translated_word]:stateLanguageType=='Chinese'?translationCH.text[translated_word]:stateLanguageType=='Portuguese'?translationPT.text[translated_word]: translationEN.text[translated_word]
}
