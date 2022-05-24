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
    console.log('[UserService] getRandomUsers: ', err);
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
    console.log('[UserService] getUserDetails: ', err);
    return [];
  }
}

export const postReaction = async (userID: string, reactionUserID: string, reactionType: number): Promise<any> => {
  try {
    const payload = {
      user_id: userID,
      reaction_user_id: reactionUserID,
      reaction_type: reactionType,
    };
    const data = await axios.post(`${userAPI}/n/reaction`, payload, {
      headers: {
        'app-id': constants.APP_ID
      }
    });
    return data.data;
  }
  catch (err) {
    console.log('[UserService] postReaction: ', err);
    return [];
  }
}