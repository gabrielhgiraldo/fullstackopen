import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }): JSX.Element => {
        return (
            <>
            {courseParts.map(part => 
                <Part part={part}/>
            )}
            </>
    );
};

export default Content;