import { httpClientQuizService } from "../config/AxiosHelper";

export const createQuiz = async (quizDetails) => {
    console.log(quizDetails);
    const response = await httpClientQuizService.post(`/quiz/create`, quizDetails, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}

export const getQuizById = async (quizId) => {
    console.log(quizId);
    const response = await httpClientQuizService.get(`/quiz/getQuiz/${quizId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}


export const getQuizzesByUserId = async (userId) => {
    console.log(userId);
    const response = await httpClientQuizService.get(`/quiz/getQuizzes/${userId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}

export const getQuizQuestions = async (quizId) => {
    console.log(quizId);
    const response = await httpClientQuizService.get(`/quiz/getQuizQuestions/${quizId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}

export const getQuizResult = async (quizId,userId, responses) => {
    console.log(quizId);
    console.log(responses);
    const response = await httpClientQuizService.post(`/quiz/submit/${quizId}/${userId}`, responses, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}

export const getQuizStats = async (quizId) => {
    console.log(quizId);
    const response = await httpClientQuizService.get(`/quiz/stats/${quizId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}


export const getSubmissions = async (userId) => {
    console.log(userId);
    const response = await httpClientQuizService.get(`/quiz/submissions/${userId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}
