import client from './client';

export const fetchCourses = async () => {
  const response = await client.get('/courses');
  return response.data;
};
