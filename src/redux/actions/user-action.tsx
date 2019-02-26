import { LOAD_USER_SUCCESS, LOAD_USER_START } from './action-types';
import { ApiResponse } from '../../models/response-model';
import apiManager from '../../manager/api-manager';

export const loadUserRequest = () => {
    return {
        type: LOAD_USER_START,
    }
}
export const loadUserSuccess = (data: object) => {
    return {
        type: LOAD_USER_SUCCESS,
        payload: data
    }
}

export class UserModel {
    gender: string = '';
    email: string = '';
}

export class User {
    user = new UserModel();
    isLoading: boolean = false;
}
const endPoint: string = '/api/?result=15';
export const fetchPeople = () => {
    return async (dispatch: any) => {
        dispatch(loadUserRequest());
        await apiManager.get<ApiResponse<UserModel[]>>(apiManager.baseUrl + endPoint, (data, err) => {
            if (data) {
                dispatch(loadUserSuccess(data.results[0]));
            }
            else {
                console.log('err', err)
            }
        });
    }
}