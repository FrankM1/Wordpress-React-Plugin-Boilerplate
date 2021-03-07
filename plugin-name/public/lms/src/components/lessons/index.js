import React, { useState } from 'react';
import _ from "lodash";

import LessonsData from "./data";
import CourseData from "../courses/data";

import { Link, useParams } from "react-router-dom";
  
function Lesson({ courseSlug, lesson, index, completeLesson }) {
    const { title, slug } = lesson
    return (
        <div className="ld-item-list-item ld-expandable ld-item-lesson-item ld-lesson-item-1103 is_not_sample learndash-complete">
            <div className="ld-item-list-item-preview">
                <div className="ld-item-name ld-primary-color-hover" style={{ textDecoration: lesson.isCompleted ? "line-through" : "" }}>
                    <div className="ld-status-icon ld-status-complete ld-secondary-background">
                        <span className="ld-icon-checkmark ld-icon"></span>
                    </div>
                    <div className="ld-item-title">
                        <Link to={`/course/${courseSlug}/lessons/${slug}`}>
                            <span>{title.rendered}</span>
                        </Link>
                    </div>
                { /** <button onClick={() => completeLesson(index)}>Complete</button> **/ }
                </div>
            </div>
        </div>
    )
}

function Lessons() {
    let { slug } = useParams();

    const courseSlug = slug;
    const course = _.find(CourseData, { slug: courseSlug });
    const lessons = _.filter(LessonsData, { course: course.id }).map( lesson => ({...lesson }) );
 
    lessons.sort(function(a, b) {
        return a.menu_order - b.menu_order;
    });

    // const [lessons, setLessons] = useState( [...data])

    // const completeLesson = index => {
    //     const newLessons = [...lessons];
    //     newLessons[index].isCompleted = true;
    //     setLessons(newLessons);
    // };

    return (
        <div className="lesson-list learndash-wrapper">
            <div className="ld-item-list ld-lesson-list">
                <div className="ld-section-heading">
                    <h2>Course Content</h2>
                    <div className="ld-item-list-actions" data-ld-expand-list="true"></div>
                </div>
                <div className="ld-item-list-items ld-lesson-progression">
                    {lessons.map((lesson, index) => (
                        <Lesson key={index} index={index} courseSlug={courseSlug} lesson={lesson}  />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Lessons
