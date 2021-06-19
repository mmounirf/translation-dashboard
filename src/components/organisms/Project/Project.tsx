import './Project.scss';
import { Progress, Button, SvgIcon } from 'src/components/atoms';
import { SummaryItem } from 'src/components/atoms/Summary/Summary';
import useLanguages from 'src/hooks/useLanguages';
import { ArrowDown, ArrowUp, Book, Camera, Chart, Checkmark, User } from 'src/assets/icons';
import useLocalStorage from '../../../hooks/useLocalstorage';
import { useState } from 'react';
import { AddLanguageModal } from 'src/components/organisms';

interface Language {
    id: string;
    stats: {
        donePercentage: number;
        untranslatedCount: number;
        unverifiedCount: number;
    };
}

interface Props {
    id: string;
    name: string;
    progress: number;
    stats: {
        done: number;
        baseWords: number;
        teamsCount: number;
        keysCount: number;
        qaCount: number;
    };
    langs: Array<Language>;
}

function Project(props: Props): JSX.Element {
    const { id, name, progress, stats, langs } = props;
    const { done, baseWords, teamsCount, keysCount, qaCount } = stats;
    const [languages, setLanguages] = useLocalStorage(`@translation-dashboard/${id}/languages`, JSON.stringify(langs));
    const [showModal, setShowModal] = useState(false);
    const languagesByKeys = useLanguages();

    const modalCloseHandler = (data: any[] | null) => {
        if(data) {
            const newLanguages = [...languages, ...data.map(lang => {
                return {
                    id: lang,
                    stats: {
                        donePercentage: 0,
                        untranslatedCount: keysCount,
                        unverifiedCount: 0
                    }
                }
            })];
            setLanguages(JSON.stringify(newLanguages));
        }
        setShowModal(false)
    }

    return (
        <div className="project">
            <AddLanguageModal openModal={showModal} onClose={modalCloseHandler} projectId={id} />
            <div className="project__sidebar">
                <h1 className="project__title">{name}</h1>
                <Progress value={progress} />
                <div className="summary">
                    <SummaryItem label="Done" value={done} isPercentage={true} />
                    <SummaryItem label="Base Words" value={baseWords} />
                    <SummaryItem label="Team" value={teamsCount} linkTo="#contributors" />
                    <SummaryItem label="Keys" value={keysCount} />
                    <SummaryItem label="QA Issues" value={qaCount} linkTo="#tasks" />
                </div>
                <div className="actions">
                    <SvgIcon Icon={ArrowUp} width={15} height={15} className="action action--upload" />
                    <SvgIcon Icon={ArrowDown} width={15} height={15} className="action action--download" />
                    <SvgIcon Icon={Checkmark} width={15} height={15} className="action action--tasks" />
                    <SvgIcon Icon={User} width={15} height={15} className="action action--team" />
                    <SvgIcon Icon={Chart} width={15} height={15} className="action action--activity" />
                    <SvgIcon Icon={Camera} width={15} height={15} className="action action--screenshots" />
                    <SvgIcon Icon={Book} width={15} height={15} className="action action--glossary "/>
                </div>
            </div>
            <div className="project__divider" />
            <div className="project__languages">
                {languages.map((lang: Language) => {
                    const { id, stats } = lang;
                    const { donePercentage, untranslatedCount, unverifiedCount } = stats;
                    return (
                        <div className="language" key={id}>
                            <div className="language__header">
                                <img width="14px" src={languagesByKeys[id].flag} alt="flag" />
                                <a href={id} className="language__name">{languagesByKeys[id].name}</a>
                            </div>
                            <Progress value={donePercentage} />
                            <div className="summary">
                                <SummaryItem label="Done" value={donePercentage} isPercentage={true} />
                                <SummaryItem label="Words to Do" value={untranslatedCount} linkTo="#wordstodo" />
                                <SummaryItem label="Unverified" value={unverifiedCount} linkTo="#unverified" />
                            </div>
                        </div>
                    )
                })}
                <div className="project_add-language">
                    <Button variant="secondary" onClick={() => setShowModal(true)}>Add Language</Button>
                </div>
            </div>
        </div>
    );
}

export default Project;
