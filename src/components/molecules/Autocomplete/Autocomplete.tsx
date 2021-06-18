import { useState, useEffect, Fragment } from 'react';
import './Autocomplete.scss';
import { Chip, SvgIcon } from 'src/components/atoms';
import { ReactComponent as CancelIcon } from 'src/assets/icons/Cancel.svg';

interface Props<T> {
    options: T[];
    searchableValue: keyof T;
    onChange: (selectedOptions: T[]) => void;
    renderSelectedOptions: (selectedOption: T, removeSelectedOption: (selectedOption: T) => void) => React.ReactNode;
    renderOption: (option: T, onSelect: (selectedItem: T, itemId: string) => void, selectedOptions: T[]) => React.ReactNode;
}

function Autocomplete<T>({ options, searchableValue, onChange, renderSelectedOptions, renderOption }: Props<T>): JSX.Element {
    const [showList, setShowList] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<T[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
    const isSelected = (option: T) => selectedOptions.includes(option);

    const removeSelectedOption = (option: T) => {
        const itemIndex = selectedOptions.findIndex((selected) => selected === option);
        const newArray = [...selectedOptions];
        newArray.splice(itemIndex, 1);
        setSelectedOptions(newArray);
    };

    const _renderSelectedOptions = selectedOptions.map((selectedOption: T) => renderSelectedOptions(selectedOption, removeSelectedOption));

    useEffect(() => {
        onChange(selectedOptions);
    }, [selectedOptions]);

    const handleSelectedItem = (selectedItem: any, itemId: string) => {
        if (!isSelected(selectedItem)) {
            setSelectedOptions([...selectedOptions, selectedItem]);
        } else {
            const newSelectedOptions = selectedOptions.filter((option: any) => option.id !== selectedItem.id);
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
        return filteredOptions.map((option: any) => renderOption(option, handleSelectedItem, selectedOptions));
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
                {_renderSelectedOptions}
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
