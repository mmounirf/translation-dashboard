import languagesData from 'src/assets/languages.json';
import { ILanguage } from '../interfaces/ILanguage';

export default function useLanguages(): {[id: string]: ILanguage} {
    return languagesData.reduce((acc, curr) => Object.assign({[curr.id]: curr, ...acc}, {}), {})
}