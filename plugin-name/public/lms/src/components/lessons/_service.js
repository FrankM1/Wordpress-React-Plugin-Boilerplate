import axios from 'axios';

const getAllLessons = (id) => {
    const args = { course: id, per_page: 100, page: 1 }
    return axios.get(`https://community.tala.ph/wp-json/ldlms/v2/sfwd-lessons`, {
        params: args
    }).then(function (response) {
        const { data } = response;
        return data;
    }).catch(function (error) {
        debugger
        console.log(error);
    });
}

const services = {
    getAllLessons
}

export default services
