import React, { useState, useEffect } from 'react';

import { Chip, SvgIcon, Button } from 'src/components/atoms';
import { Modal, Autocomplete } from 'src/components/molecules';

import useLocalStorage from 'src/hooks/useLocalstorage';

import { ReactComponent as CancelIcon } from 'src/assets/icons/Cancel.svg';

import data from 'src/assets/languages.json';

import './AddLanguageModal.scss';

interface Props {
    openModal: boolean;
    projectId: string;
    onClose: (data: any[] | null) => void;
}

export default function AddLanguageModal(props: Props) {
    const { openModal, onClose, projectId } = props;
    const [showModal, setShowModal] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);
    const [languages] = useLocalStorage(`@translation-dashboard/${projectId}/languages`);
    const previouslySelectedLangauges = languages.map((lang: any) => lang.id);
    const languagesToAdd = data.filter((lang) => !previouslySelectedLangauges.includes(lang.id));
    const modalCallbackPayload = selectedLanguages.map((language) => language.id);

    useEffect(() => {
        setShowModal(openModal);
    }, [openModal]);

    function _modalCloseHandler() {
        onClose(null);
    }

    function _modalAddHandler() {
        if (selectedLanguages.length) {
            onClose(modalCallbackPayload);
        } else {
            onClose(null);
        }
    }

    function _onAutocompleteChange(selectedOptions: any[]) {
        setSelectedLanguages(selectedOptions);
    }

    function _renderSelectedOptions(selectedOption: any, removeSelectedOption: any) {
        const { name, code, flag, countryCode } = selectedOption;
        function _onRemoveClick() {
            removeSelectedOption(selectedOption);
        }
        return (
            <Chip className="autocomplete__selected-item" key={code}>
                <>
                    <img src={flag} width="20px" alt="flag" />
                    <span className="selected-item__label">
                        {name} ({code}_{countryCode})
                    </span>
                    <span className="selected-item__remove" onClick={_onRemoveClick}>
                        <SvgIcon Icon={CancelIcon} />
                    </span>
                </>
            </Chip>
        );
    }

    function _renderOption(option: any, onSelect: any, selectedOptions: any) {
        const { name, countryName, flag, id } = option;
        return (
            <div className={selectedOptions.includes(option) ? 'selected' : ''} key={id} onClick={() => onSelect(option, id)}>
                <img src={flag} width="20px" alt="flag" /> {name} ({countryName}) ({id})
            </div>
        );
    }

    return (
        <div className="add-languages-modal">
            <Modal title="Add Languages" showModal={showModal} close={_modalCloseHandler}>
                <Autocomplete
                    options={languagesToAdd}
                    searchableValue="name"
                    onChange={_onAutocompleteChange}
                    renderSelectedOptions={_renderSelectedOptions}
                    renderOption={_renderOption}
                />
                <div className="add-languages-modal__actions">
                    <Button variant="secondary" onClick={_modalCloseHandler}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={_modalAddHandler}>
                        Add
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
