const getAxios200Response = function (params = {}) {
    return {
        data: params.data || {},
        status: 200,
        statusText: 'OK',
        headers: params.headers || {},
        config: params.headers || {},
    };
};

const getAxios400Response = function (params = {}) {
    return {
        data: params.data || {},
        status: 400,
        statusText: 'Bad Input',
        headers: params.headers || {},
        config: params.headers || {},
    };
};

const getAxios404Error = function (params = {}) {
    return {
        response: {
            data: params.data || {},
            status: 404,
            statusText: 'Not Found',
            headers: params.headers || {},
            config: params.headers || {},
        }
    };
};

export {
    getAxios200Response,
    getAxios400Response,
    getAxios404Error,
};