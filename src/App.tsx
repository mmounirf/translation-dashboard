import './App.scss';
import Autocomplete from './components/molecules/Autocomplete/Autocomplete';

const items = [
    { key: '1', value: 'Egypt' },
    { key: '2', value: 'USA' },
    { key: '3', value: 'Germany' }
];

function App(): JSX.Element {
    return (
        <div className="App">
            <Autocomplete options={items} />
        </div>
    );
}

export default App;
