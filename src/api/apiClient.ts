import * as res from "../data/feed-spots.json";

export interface FeedSpot {
  id: string;
  name: string;
  specie: string;
  animalsCount: number;
  coordinates: number[];
}

// const baseURL = process.env.REACT_APP_API_URL;

const fetchFeedSpots = async (): Promise<FeedSpot[]> => {
  // const response = await window.fetch(`${baseURL}/feed-spots`, {
  //   method: "GET",
  // });

  // const data = await response.json();

  // if (response.ok) {
  //   return data;
  // } else {
  //   return Promise.reject(data.error || "Something went wrong. Try refreshing");
  // }
  return Promise.resolve(res.data);
};

const fetchFeedSpot = async (spotID: string): Promise<FeedSpot> => {
  // const response = await window.fetch(`${baseURL}/feed-spots`, {
  //   method: "GET",
  // });

  // const data = await response.json();

  // if (response.ok) {
  //   return data;
  // } else {
  //   return Promise.reject(data.error || "Something went wrong. Try refreshing");
  // }
  return Promise.resolve(res.data[0]);
};

const createFeedSpot = async (data: Partial<FeedSpot>): Promise<FeedSpot> => {
  const newFeedSpot = {
    id: "964",
    name: "Test spot 4",
    specie: "Cat",
    animalsCount: 15,
    coordinates: [32.1557964, 34.8939615],
  };
  // const response = await window.fetch(`${baseURL}/feed-spots`, {
  //   method: "GET",
  // });

  // const data = await response.json();

  // if (response.ok) {
  //   return data;
  // } else {
  //   return Promise.reject(data.error || "Something went wrong. Try refreshing");
  // }
  return Promise.resolve(newFeedSpot);
};

export default {
  fetchFeedSpots,
  fetchFeedSpot,
  createFeedSpot,
};
