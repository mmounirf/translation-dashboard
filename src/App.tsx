import './App.scss';
import Autocomplete, { SelectedItem } from './components/molecules/Autocomplete/Autocomplete';
import data from 'src/assets/data.json';
import { useState } from 'react';

function App(): JSX.Element {
    const [selected, setSelected] = useState<SelectedItem[]>([]);
    return (
        <div className="App">
            <Autocomplete
                options={data}
                selected={selected}
                searchableValue="name"
                renderOption={(option, onSelect) => {
                    const { name, code = '', countryName, countryCode, flag } = option;
                    return (
                        <li key={`${code}_${countryCode}`} onClick={() => onSelect(option)}>
                            <img src={flag} width="20px"/> {name} ({countryName}) ({code}_{countryCode})
                        </li>
                    )
                }}
            />
        </div>
    );
}

export default App;
