import React from 'react'
import { Link, useParams } from "react-router-dom";
import LessonsData from "../lessons/data";
import _ from "lodash";
import DOMPurify from 'dompurify';

export default function Lesson() {
    let { lessonID } = useParams();
    const lesson = _.find(LessonsData, { id: parseInt(lessonID, 10 ) });
    const rawHTML = lesson.content.rendered

    return (
        <div>
           <h2>{lesson.title.rendered}</h2>
            { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} /> }
        </div>

    )
}
