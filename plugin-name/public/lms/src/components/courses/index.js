import React, { useEffect, useState } from 'react'
import Course from './course'
import courseService from './_service'

export default function Courses() {
    const [loading, setLoading] = useState(true)  
    const [error, setError] = useState('')  
    const [courses, setCourses] = useState([])

    useEffect(() => {  
        courseService.getAllCourses().then(data => {
            data.sort(function(a, b) {
                return a.menu_order - b.menu_order;
            });

            setLoading(false)  
            setCourses([...data])  
            setError('')  
        })  
        .catch(error => {  
            setLoading(false)  
            setCourses([])  
            setError('Something went wrong')  
        })  
    }, []) 

    return (
        <div>
            Course
            { courses.map( (course, key) => {
                return (<Course key={key} course={course} />)
            })}
        </div>
    )
}
