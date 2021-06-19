import './App.scss';
import { Dashboard} from 'src/pages';
import data from 'src/assets/languages.json';
import Autocomplete from './components/molecules/Autocomplete/Autocomplete';
import { Chip, SvgIcon } from 'src/components/atoms';
import { ReactComponent as CancelIcon } from 'src/assets/icons/Cancel.svg';

function App(): JSX.Element {
    return (
        <Dashboard />
        // <div className="App">
        //     <Autocomplete
        //         options={data}
        //         searchableValue="name"
        //         onChange={(selectedOptions) => console.log(selectedOptions)}
        //         renderSelectedOptions={(selectedOption, removeSelectedOption) => {
        //             const { name, code, flag, countryCode } = selectedOption;
        //             return (
        //                 <Chip className="autocomplete__selected-item" key={code}>
        //                 <>
        //                     <img src={flag} width="20px" />
        //                     <span className="selected-item__label">
        //                         {name} ({code}_{countryCode})
        //                     </span>
        //                     <span className="selected-item__remove" onClick={() => removeSelectedOption(selectedOption)}>
        //                         <SvgIcon Icon={CancelIcon} />
        //                     </span>
        //                 </>
        //             </Chip>
        //             );
        //         }}
        //         renderOption={(option, onSelect, selectedOptions) => {
        //             const { name, countryName, flag, id } = option;
        //             return (
        //                 <div className={selectedOptions.includes(option) ? 'selected' : ''} key={id} onClick={() => onSelect(option, id)}>
        //                     <img src={flag} width="20px" /> {name} ({countryName}) ({id})
        //                 </div>
        //             );
        //         }}
        //     />
        // </div>
    );
}

export default App;
