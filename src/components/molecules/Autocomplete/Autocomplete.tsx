import './Autocomplete.scss';

interface AutocompleteListItem {
    key: string;
    value: string;
}

type AutocompleteListProps = Pick<Props, 'options'>;

interface Props {
    options: Array<AutocompleteListItem>;
    placeholder?: string;
}

function AutocompleteList({ options }: AutocompleteListProps): JSX.Element {
    return (
        <ul className="autocomplete__options">
            {options.map(({ key, value }) => (
                <li key={key}>{value}</li>
            ))}
        </ul>
    );
}

function AutocompleteChips({ options }: AutocompleteListProps): JSX.Element {
    return (
        <div className="chips-list">
            {options.map(({ key, value }) => (
                <span className="chips-list__item" key={key}>
                    {value}
                </span>
            ))}
        </div>
    );
}

function Autocomplete({ options, placeholder = 'Select Language' }: Props): JSX.Element {
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => console.log(event);
    const selectedItems = [
        { key: '1', value: 'Egypt' },
        { key: '2', value: 'USA' }
    ];
    return (
        <div className="autocomplete">
            <AutocompleteChips options={selectedItems} />
            <input className="autocomplete__input" type="text" autoComplete="off" placeholder={placeholder} onChange={onInputChange} />
            {/* <AutocompleteList options={options} /> */}
        </div>
    );
}

export default Autocomplete;
