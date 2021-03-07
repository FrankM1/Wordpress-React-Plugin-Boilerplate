import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import _ from "lodash";
import DOMPurify from 'dompurify';

import courseService from '../courses/_service'
import lessonService from '../lessons/_service'

export default function Lesson() {
    let { courseSlug, lessonSlug } = useParams();

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [course, setCourse] = useState({})
    const [lesson, setLesson] = useState({})

    const nextLessonSlug = '';

    useEffect(() => {
        courseService.getAllCourses().then(data => {
            const found = _.find(data, { slug: courseSlug })
            setCourse({ ...found })
            setError('')
        })
            .catch(error => {
                setCourse({})
                setError('Something went wrong')
            })
    }, [courseSlug])

    useEffect(() => {
        lessonService.getAllLessons().then(data => {
            const found = _.find(data, { course: course.id })
            setLoading(false)
            setLesson({ ...found })
            setError('')
        })
            .catch(error => {
                setLoading(false)
                setLesson([])
                setError('Something went wrong')
            })
    }, [course.id])

    if (Object.keys(course).length === 0 || Object.keys(lesson).length === 0) {
        return null
    }

    const { title: { rendered: courseHeaderHTML } } = course
    const { title: { rendered: headerHTML }, content: { rendered: rawHTML } } = lesson

    return (
         <div>
            <div className="flex bb-position">
                <div className="sfwd-course-position">
                    <span className="bb-pages">Lesson</span>
                </div>
            </div>
            <div className="lms-header-title">
                <h1>{courseHeaderHTML}</h1>
            </div>
            <div className="sfwd-course-nav top-border">
                <div className="learndash_next_prev_link">
                    <span className="prev-link empty-post">PREVIOUS STEP</span>
                    <Link to={`/course/${course.slug}/lessons/${nextLessonSlug}/`} className="next-link" rel="next">
                        NEXT STEP <span className="meta-nav" data-balloon-pos="up" data-balloon="Next">→</span>
                    </Link>
                </div>
            </div>

            <div className="lms-header-title">
                <h2>{DOMPurify.sanitize(headerHTML)}</h2>
            </div>
            { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} /> }
        </div>
    )
}
