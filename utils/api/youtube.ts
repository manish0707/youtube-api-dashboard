import { ISearchParams, YoutubeSearchResponse } from "./@types";
import { axiosInstance } from "./axios";

const searchPath = "/search";

export const searchYoutube = async (params: ISearchParams) => {
  const response = await axiosInstance.get<YoutubeSearchResponse>(searchPath, {
    params: { part: "snippet", ...params },
  });
  return response.data.items;
};
