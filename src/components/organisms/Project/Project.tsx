import './Project.scss';
import { Progress } from 'src/components/atoms';
import { SummaryItem } from 'src/components/atoms/Summary/Summary';


interface Language {
    id: string,
    stats: {
        donePercentage: number,
        untranslatedCount: number,
        unverifiedCount: number
    }
}

interface Props {
    id: string,
    name: string,
    progress: number,
    stats: {
        done: number,
        baseWords: number,
        teamsCount: number,
        keysCount: number,
        qaCount: number
    }
    langs: Array<Language>
}

function Project(props: Props): JSX.Element {
    const { id, name, progress, stats, langs } = props;
    const { done, baseWords, teamsCount, keysCount, qaCount } = stats;
    return (
        <div className="project">
            <div className="project__sidebar">
                <h1>{name}</h1>
                <Progress value={progress} />
                <div className="summary">
                    <SummaryItem label="Done" value={done} isPercentage={true} />
                    <SummaryItem label="Base Words" value={baseWords} />
                    <SummaryItem label="Team" value={teamsCount} linkTo="#contributors" />
                    <SummaryItem label="Keys" value={keysCount} />
                    <SummaryItem label="QA Issues" value={qaCount} linkTo="#tasks"/>
                </div>
            </div>
            <div className="projects__languages">

            </div>
        </div>
    );
}

export default Project;
