import { httpClientQuestionService } from "../config/AxiosHelper";


export const addQuestion = async (question) => {
    console.log(question);
    const response = await httpClientQuestionService.post(`/question/add`, question, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}

export const getQuestionsByAuthor = async (questionIds) => {
    const response = await httpClientQuestionService.post(`/question/getQuestionsByAuthor`, questionIds,{
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}
