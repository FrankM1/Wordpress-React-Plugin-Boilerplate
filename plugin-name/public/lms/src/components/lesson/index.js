import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import _ from "lodash";
import DOMPurify from 'dompurify';

import courseService from '../courses/_service'
import lessonService from '../lessons/_service'

export default function Lesson() {
    let { courseSlug, lessonSlug } = useParams();

    const [forceReload, setForceReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [course, setCourse] = useState({})
    const [lesson, setLesson] = useState({})
    const [lessons, setLessons] = useState([])
    const [prevLesson, setPrevLesson] = useState({})
    const [prevLessonSlug, setPrevLessonSlug] = useState('')
    const [nextLesson, setNextLesson] = useState({})
    const [nextLessonSlug, setNextLessonSlug] = useState('')

    let location = useLocation();

    useEffect(() => {
        if (forceReload) {
            window.location.reload();
        }
    }, [location.pathname, forceReload])

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
        lessonService.getAllLessons(course.id).then(data => {
            data.sort(function(a, b) {
                return a.menu_order - b.menu_order;
            });

            const found = _.find(data, { slug: lessonSlug })
            setLoading(false)
            setLesson({ ...found })
            setLessons([...data])
            setError('')
        })
            .catch(error => {
                setLoading(false)
                setLesson({})
                setLessons([])
                setError('Something went wrong')
            })
    }, [course.id, lessonSlug])

    useEffect(() => {
        const found = _.filter(lessons, { course: course.id })

        if( !found ) {
            return;
        }

        found.sort(function(a, b) {
            return a.menu_order - b.menu_order;
        });

        const currentIndex = _.findIndex(found, lesson);

        if ( currentIndex == -1){
            return;
        }

        const nextIndex = currentIndex + 1; 

        if ( currentIndex < nextIndex && nextIndex <= found.length ) {
            setNextLesson(found[nextIndex]);
        }

        console.log('lessons', found);
        console.log('currentIndex', currentIndex);
        console.log('nextIndex', nextIndex);

        const prevIndex = currentIndex - 1; 

        setPrevLesson(found[prevIndex]);

    }, [lessons, lesson, course.id]);

    useEffect(() => {
        if( prevLesson && Object.keys(prevLesson).length !== 0) {
            setPrevLessonSlug(`/${prevLesson.slug}`)
        }
        if( nextLesson && Object.keys(nextLesson).length !== 0) {
            setNextLessonSlug(`/${nextLesson.slug}`)
        }
    }, [nextLesson, prevLesson]);

    if (loading) {
        return "Loading..."
    }

    if (error) {
        return error
    }

    if (Object.keys(course).length === 0 || Object.keys(lesson).length === 0) {
        console.log(lesson)
        return 'No Data Found'
    }

    const { title: { rendered: courseHeaderHTML } } = course
    const { title: { rendered: headerHTML }, content: { rendered: rawContentHTML } } = lesson

    const parsedRawHTML = _.replace(rawContentHTML, 'https://community.tala.ph/course', 'http://localhost:3000');     

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
                    { ! prevLessonSlug && <span className="prev-link empty-post">PREVIOUS STEP</span> }
                    { prevLessonSlug && <Link onClick={ () => { setForceReload(true) }}to={`/${course.slug}/lessons${prevLessonSlug}`} className="prev-link" rel="previous">
                    PREVIOUS STEP <span className="meta-nav" data-balloon-pos="up" data-balloon="Previous">→</span>
                    </Link> }

                    { ! nextLessonSlug && <span className="next-link empty-post">NEXT STEP</span> }
                    { nextLessonSlug && <Link onClick={ () => { setForceReload(true) }}to={`/${course.slug}/lessons${nextLessonSlug}`} className="next-link" rel="next">
                        NEXT STEP <span className="meta-nav" data-balloon-pos="up" data-balloon="Next">→</span>
                    </Link> }
                </div>
            </div>

            <div className="lms-header-title">
                <h2>{DOMPurify.sanitize(headerHTML)}</h2>
            </div>
            { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parsedRawHTML) }} />}
        </div>
    )
}
