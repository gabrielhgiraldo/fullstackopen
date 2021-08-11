import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
    switch(part.type) {
        case 'normal': {
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                </p>
            );
        }
        case 'submission': {
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    submit to {part.exerciseSubmissionLink}
                </p>
            );
        }
        case 'groupProject': {
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div>project exercises {part.groupProjectCount}</div>
                </p>
            );
        }
        case 'special': {
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    required skills: {part.requirements.join(', ')}
                </p>
            );
        }
        default: {
            return assertNever(part);
        }
    }
};

export default Part;