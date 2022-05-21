import axios from "axios";
import constants from "../utils/constants";

const userAPI = constants.API_ENDPOINT + constants.API_USER;

export const getRandomUsers = async (page: number = 0, limit: number = 20): Promise<any> => {
  try {
    const data = await axios.get(`${userAPI}?limit=${limit}&&page=${page}`, {
      headers: {
        'app-id': constants.APP_ID
      }
    });
    return data.data.data;
  }
  catch (err) {
    console.log('[User Service] getRandomUsers: ', err);
    return [];
  }
}

export const getUserDetails = async (userID: string): Promise<any> => {
  try {
    const data = await axios.get(`${userAPI}/${userID}`, {
      headers: {
        'app-id': constants.APP_ID
      }
    });
    return data.data;
  }
  catch (err) {
    console.log('[User Service] getUserDetails: ', err);
    return [];
  }
}