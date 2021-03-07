import React from 'react'
import { Link, useParams } from "react-router-dom";
import _ from "lodash";
import DOMPurify from 'dompurify';

import LessonsData from "../lessons/data";
import CoursesData from "../courses/data";

export default function Lesson() {
    let { courseSlug, lessonSlug } = useParams();
    const course = _.find(CoursesData, { slug: courseSlug });
    const lesson = _.find(LessonsData, { slug: lessonSlug });
    const rawHTML = lesson.content.rendered
    return (
        <div>

            <div className="flex bb-position">
                <div className="sfwd-course-position">
                    <span className="bb-pages">Lesson</span>
                </div>
            </div>
            <div className="lms-header-title">
                <h1>{course.title.rendered}</h1>
            </div>
            <div className="sfwd-course-nav top-border">
                <div className="learndash_next_prev_link">
                    <span className="prev-link empty-post">PREVIOUS STEP</span>
                    <a href="/course/budgeting-101/lessons/step-2-ano-nga-ba-ang-budget/" className="next-link" rel="next">NEXT STEP <span className="meta-nav" data-balloon-pos="up" data-balloon="Next">→</span></a>
                </div>
            </div>

            <div className="lms-header-title">
                <h2>{lesson.title.rendered}</h2>
            </div>
            { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} />}
        </div>
    )
}
