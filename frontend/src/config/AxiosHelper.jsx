import axios from "axios";

export const baseURL = "http://localhost:8765";

export const httpClientUserSerivce = axios.create({
        baseURL:baseURL+"/user-service",
    }
);

export const httpClientQuestionService = axios.create({
    baseURL:baseURL+"/question-service",
}
);

export const httpClientQuizService = axios.create({
    baseURL:baseURL+"/quiz-service",
}
);