import React, { useEffect, useState } from 'react'
import axios from "axios";
import Course from './course'
import data from './data'

export default function Courses() {
    const [courses, setCourses] = useState([...data])

    useEffect(() => {
        const headers = {
            'Content-Type': 'appliation/json',
            'Access-Control-Allow-Origin': '*',
        };

        axios({
            method: 'get',
            url: "https://community.tala.test/wp-json/ldlms/v1/sfwd-courses",
            config: {
                headers
            }
        }).then(res => {
           // setCourses([ ...res]);
        });
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
