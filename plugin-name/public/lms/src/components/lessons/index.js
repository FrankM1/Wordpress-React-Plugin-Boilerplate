import React, { useState } from 'react'
import LessonsData from "./data";
import { Link, useParams } from "react-router-dom";
  
function Lesson({ courseID, lesson, index, completeLesson }) {
    const { title, id } = lesson
    return (
        <div className="ld-item-list-item ld-expandable ld-item-lesson-item ld-lesson-item-1103 is_not_sample learndash-complete">
            <div className="ld-item-list-item-preview">
                <div className="ld-item-name ld-primary-color-hover" style={{ textDecoration: lesson.isCompleted ? "line-through" : "" }}>
                    <div className="ld-status-icon ld-status-complete ld-secondary-background">
                        <span className="ld-icon-checkmark ld-icon"></span>
                    </div>
                    <div className="ld-item-title">
                        <Link to={`/courses/${courseID}/lesson/${id}`}>
                            <span>{title.rendered}</span>
                        </Link>
                    </div>
                    <button onClick={() => completeLesson(index)}>Complete</button>
                </div>
            </div>
        </div>
    )
}

function Lessons() {
    let { id } = useParams();

    const courseID = id; // Budgeting 101
    const data = LessonsData.map( lesson => ({...lesson, isCompleted: false }) ).filter(lesson => {
        return ( parseInt(lesson.course, 10) !== parseInt(lesson.course, courseID) ) 
    });

    data.sort(function(a, b) {
        return a.menu_order - b.menu_order;
    });

    const [lessons, setLessons] = useState( [...data])

    const completeLesson = index => {
        const newLessons = [...lessons];
        newLessons[index].isCompleted = true;
        setLessons(newLessons);
    };

    debugger;

    return (
        <div className="lesson-list learndash-wrapper">
            <div className="ld-item-list ld-lesson-list">
                <div className="ld-section-heading">
                    <h2>Course Content</h2>
                    <div className="ld-item-list-actions" data-ld-expand-list="true"></div>
                </div>
                <div className="ld-item-list-items ld-lesson-progression">
                    {lessons.map((lesson, index) => (
                        <Lesson key={index} index={index} courseID={courseID} lesson={lesson} completeLesson={completeLesson} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Lessons
