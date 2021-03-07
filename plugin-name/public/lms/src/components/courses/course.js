import React from 'react'
import { Link } from 'react-router-dom';

export default function course({ course }) {
    return (
        <Link to={`/${course.slug}/lessons`}>
            <div className={"bb-cover-list-item"}>
                <img width="200" height="200" src={'https://community.tala.ph/wp-content/uploads/sites/3/2019/07/icon-how-to-budget-1.png'} alt={course.title.rendered} />
                <div className={"bb-card-course-details"}>
                    <h2 className={"bb-course-title"}>{course.title.rendered}</h2>
                </div>
            </div>
        </Link >
    )
}
