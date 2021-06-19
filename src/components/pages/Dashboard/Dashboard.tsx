import React from 'react';

import { Button } from 'src/components/atoms';
import { Project } from 'src/components/organisms';

import projectsData from 'src/assets/data.json';
import './Dashboard.scss';

function Dashboard(): JSX.Element {
    const _renderProjects = projectsData.map((project) => {
        const { id } = project;
        return <Project {...project} key={id} />;
    });
    return (
        <div className="dashboard">
            <div className="dashboard__toolbar">
                <Button>New project ⇧⌘P</Button>
                <Button variant="secondary">Expand all</Button>
                <Button variant="secondary">Collapse all</Button>
            </div>
            <div className="dashboard__projects">{_renderProjects}</div>
        </div>
    );
}

export default Dashboard;
