import axios from 'axios';

const getAllCourses = () => {
    const args = { per_page: 100, page: 1 }
    return axios.get(`https://community.tala.ph/wp-json/ldlms/v2/sfwd-courses`, {
        params: args
    }).then(function (response) {
        const { data } = response;
        return data;
    }).catch(function (error) {
        debugger
        console.log(error);
    });
}

const getCourse = (slug, courseID) => {
    const args = { course: courseID, slug: slug, per_page: 100, page: 1 }
    return axios.get(`https://community.tala.ph/wp-json/ldlms/v2/sfwd-courses`, {
        params: args
    }).then(function (response) {
        const { data } = response;
        return data;
    }).catch(function (error) {
        debugger
        console.log(error);
    });
}

const services =  {
    getAllCourses,
    getCourse
}

export default services