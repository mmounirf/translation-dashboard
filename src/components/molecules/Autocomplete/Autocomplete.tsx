import { useState, useEffect, Fragment } from 'react';
import './Autocomplete.scss';
import { Chip } from 'src/components/atoms';

interface Props<T> {
    options: T[];
    searchableValue: keyof T;
    onChange: (selectedOptions: T[]) => void;
    renderOption: (option: T, onSelect: (selectedItem: T) => void) => React.ReactNode;
}

function Autocomplete<T>({ options, searchableValue, onChange, renderOption }: Props<T>): JSX.Element {
    const [showList, setShowList] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<T[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
    const isSelected = (option: T) => selectedOptions.includes(option);

    const _renderSelectedList = selectedOptions.map(({ name, code, flag, countryCode }: any) => (
        <Chip className="autocomplete__selected-item" key={code}>
            <>
                <img src={flag} width="20px" /> {name} ({code}_{countryCode})
            </>
        </Chip>
    ));

    useEffect(() => {
        onChange(selectedOptions);
    }, [selectedOptions])

    const handleSelectedItem = (selectedItem: any) => {
        if (!isSelected(selectedItem)) {
            setSelectedOptions([...selectedOptions, selectedItem]);
        } else {
            const newSelectedOptions = selectedOptions.filter(
                (option: any) => option.code !== selectedItem.code && option.countryCode && selectedItem.countryCode
            );
            setSelectedOptions(newSelectedOptions);
        }
        setInputValue('');
        setShowList(false);
    };

    const _renderOptionsList = () => {
        if (!filteredOptions.length) {
            return (
                <li className="autocomplete__options--no-results">
                    No option matches <strong>{inputValue}</strong>
                </li>
            );
        }
        return filteredOptions.map((option) => (
            <div className={selectedOptions.includes(option) ? 'selected' : ''}>{renderOption(option, handleSelectedItem)}</div>
        ));
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
