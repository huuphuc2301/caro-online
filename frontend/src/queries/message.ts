import { useQuery } from 'react-query';
import axios from 'axios';
import config from 'config';

export const getMessage = async (): Promise<String> => {
  const response = await axios.get(`${config.apiEndpoint}/example`);
  return response.data.data;
};

export const useGetMessage = () => useQuery(['message'], () => getMessage());
