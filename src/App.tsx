import './App.scss';
import data from 'src/assets/data.json';
import Autocomplete from './components/molecules/Autocomplete/Autocomplete';

function App(): JSX.Element {
    return (
        <div className="App">
            <Autocomplete
                options={data}
                searchableValue="name"
                onChange={(selectedOptions) => console.log(selectedOptions)}
                renderOption={(option, onSelect) => {
                    const { name, code = '', countryName, countryCode, flag } = option;
                    return (
                        <div key={`${code}_${countryCode}`} onClick={() => onSelect(option)}>
                            <img src={flag} width="20px" /> {name} ({countryName}) ({code}_{countryCode})
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default App;
