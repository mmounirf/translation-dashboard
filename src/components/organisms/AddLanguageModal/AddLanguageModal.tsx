import { Modal, Autocomplete } from 'src/components/molecules';
import { Chip, SvgIcon, Button } from 'src/components/atoms';
import { ReactComponent as CancelIcon } from 'src/assets/icons/Cancel.svg';
import data from 'src/assets/languages.json';
import './AddLanguageModal.scss';
import { useState, useEffect } from 'react';

interface Props {
    openModal: boolean;
    onClose: (data: any[] | null) => void;
}

export default function AddLanguageModal(props: Props) {
    const { openModal, onClose } = props;
    const [showModal, setShowModal] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);

    useEffect(() => {
        setShowModal(openModal)
    }, [openModal]);

    const modalCloseHandler = () => {
        onClose(null)
    }

    const modalAddHandler = () => {
        if(selectedLanguages.length) {
            const modalCallbackPayload = selectedLanguages.map((language) => language.id);
            onClose(modalCallbackPayload);
        } else {
            onClose(null);
        }
    }

    return (
        <div className="add-languages-modal">
            <Modal title="Add Languages" showModal={showModal} close={modalCloseHandler}>
            <Autocomplete
                options={data}
                searchableValue="name"
                onChange={(selectedOptions) => setSelectedLanguages(selectedOptions)}
                renderSelectedOptions={(selectedOption, removeSelectedOption) => {
                    const { name, code, flag, countryCode } = selectedOption;
                    return (
                        <Chip className="autocomplete__selected-item" key={code}>
                            <>
                                <img src={flag} width="20px" alt="flag" />
                                <span className="selected-item__label">
                                    {name} ({code}_{countryCode})
                                </span>
                                <span className="selected-item__remove" onClick={() => removeSelectedOption(selectedOption)}>
                                    <SvgIcon Icon={CancelIcon} />
                                </span>
                            </>
                        </Chip>
                    );
                }}
                renderOption={(option, onSelect, selectedOptions) => {
                    const { name, countryName, flag, id } = option;
                    return (
                        <div className={selectedOptions.includes(option) ? 'selected' : ''} key={id} onClick={() => onSelect(option, id)}>
                            <img src={flag} width="20px" alt="flag" /> {name} ({countryName}) ({id})
                        </div>
                    );
                }}
            />
            <div className="add-languages-modal__actions">
                <Button variant="secondary" onClick={modalCloseHandler}>Close</Button>
                <Button variant="primary" onClick={modalAddHandler}>Add</Button>
            </div>
        </Modal>
        </div>
    );
}
