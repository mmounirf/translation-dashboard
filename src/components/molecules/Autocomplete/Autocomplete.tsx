import { Fragment, useState, useEffect } from 'react';
import './Autocomplete.scss';

interface AutocompleteListItem {
    key: string;
    value: string;
}

type AutocompleteListProps = Pick<Props, 'options'>;

interface Props {
    options: Array<AutocompleteListItem>;
    onChange: (selectedItems: Array<AutocompleteListItem>) => void
}

function AutocompleteChips({ options }: AutocompleteListProps): JSX.Element {
    return (
        <Fragment>
            {options.map(({ key, value }) => (
                <span className="autocomplete__selected-item" key={key}>
                    {value}
                </span>
            ))}
        </Fragment>
    );
}

const selectedItems: Array<AutocompleteListItem> = Array(25)
    .fill('item')
    .map((item, i) => {
        return {
            key: `${i}`,
            value: `Language ${i}`
        };
    });

function Autocomplete({ options, onChange }: Props): JSX.Element {
    const [showList, setShowList] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(selectedItems);

    const onItemSelect = (selectedItem: AutocompleteListItem) => {
        onChange(selectedItems);
    }

    function AutocompleteList({ options }: AutocompleteListProps): JSX.Element {
        return (
            <ul className="autocomplete__list">
                {options.map(({ key, value }) => (
                    <li className="autocomplete__list-item" key={key} onClick={() => onItemSelect({key, value})}>
                        {value}
                    </li>
                ))}
                {options.length === 0 && inputValue && (
                    <li className="autocomplete__list-item autocomplete__list-item--not-results">
                        No language matches <strong>{inputValue}</strong>
                    </li>
                )}
            </ul>
        );
    }

    useEffect(() => {
        if (inputValue) {
            setShowList(true);
            const filterResults = selectedItems.filter((item) => item.value.toLocaleLowerCase().search(inputValue.toLocaleLowerCase()) !== -1);
            setFilteredOptions(filterResults);
        } else {
            setFilteredOptions(selectedItems);
        }
    }, [inputValue]);

    return (
        <div className="autocomplete">
            <div className="autocomplete__content">
                <AutocompleteChips options={selectedItems} />
                <input
                    className="autocomplete__input"
                    type="text"
                    value={inputValue}
                    autoComplete="off"
                    onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => setInputValue(target.value)}
                    onFocus={() => setShowList(true)}
                    onBlur={() => setTimeout(() => setShowList(false), 100)}
                />
            </div>
            {showList && <AutocompleteList options={filteredOptions} />}
        </div>
    );
}

export default Autocomplete;
