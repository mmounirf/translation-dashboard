import { useState, useEffect } from 'react';
import './Autocomplete.scss';
import { Chip } from 'src/components/atoms';

export interface SelectedItem {
    key: string,
    value: string
}

interface Props<T> {
    options: T[],
    searchableValue: keyof T,
    selected?: SelectedItem[],
    renderOption: (option: T, onSelect: (selectedItem: T) => void) => React.ReactNode;
}

function Autocomplete<T>({ options, searchableValue, selected = [], renderOption }: Props<T>): JSX.Element {
    const [showList, setShowList] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<SelectedItem[]>(selected);
    const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
    const _renderSelectedList = selected.map(({ key, value }) => <Chip className="autocomplete__selected-item" key={key}>{value}</Chip>);

    const handleSelectedItem = (selectedItem: T) => {
        setInputValue('');
        // setShowList(false);

        console.log(selectedItem);
    }
    
    const _renderOptionsList = () => {
        if(!filteredOptions.length) {
             return (
                <li className="autocomplete__options--no-results">
                    No option matches <strong>{inputValue}</strong>
                </li>
             )   
        }
        return filteredOptions.map((option) => renderOption(option, handleSelectedItem))
    };

    useEffect(() => {
        if (inputValue) {
            setShowList(true);
            const filteredResults = options.filter((option) => {
                const searchValue = option[searchableValue] as unknown as string;
                return searchValue.toLowerCase().search(inputValue.toLowerCase()) !== -1;
            });
            setFilteredOptions(filteredResults);
        } else {
            setFilteredOptions(options);
        }
    }, [inputValue]);

    return (
        <div className="autocomplete">
            <div className="autocomplete__content">
                {_renderSelectedList}
                <input
                    className="autocomplete__input"
                    type="text"
                    value={inputValue}
                    autoComplete="off"
                    onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => setInputValue(target.value)}
                    onFocus={() => setShowList(true)}
                />
            </div>
            {showList && <div className="autocomplete__options">{_renderOptionsList()}</div>}
        </div>
    );
}

export default Autocomplete;
