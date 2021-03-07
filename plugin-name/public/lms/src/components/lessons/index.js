import React, { useState, useEffect } from 'react';
import _ from "lodash";

import lessonService from './_service'
import courseService from '../courses/_service'

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
                        <Link to={`/${courseSlug}/lessons/${slug}`}>
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

    const [loading, setLoading] = useState(true)  
    const [error, setError] = useState('')  
    const [lessons, setLessons] = useState([])
    const [course, setCourse] = useState({})

    useEffect(() => {  
        courseService.getCourse(slug).then(data => {
           const found = _.find( data, { slug: slug})
            setLoading(false)  
            setCourse({...found})  
            setError('')  
        })  
        .catch(error => {  
            setLoading(false)  
            setCourse({})  
            setError('Something went wrong')  
        })  
    }, [slug])

    useEffect(() => {  
        const { id: courseID } = course
        lessonService.getAllLessons(courseID).then(data => {
            data.sort(function(a, b) {
                return a.menu_order - b.menu_order;
            });

            setLoading(false)  
            setLessons([...data])  
            setError('')  
        })  
        .catch(error => {  
            setLoading(false)  
            setLessons([])  
            setError('Something went wrong')  
        })
    }, [course]) 

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
                        <Lesson key={index} index={index} courseSlug={slug} lesson={lesson}  />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Lessons
