type ISearchType = "channel" | "playlist" | "video";

export interface ISearchParams {
  q: string;
  maxResults: number;
  type: ISearchType;
}

export interface Item {
  kind?: ItemKind;
  etag: string;
  id: ID;
  snippet: Partial<Snippet>;
}

export interface ID {
  kind?: IDKind;
  channelId: string;
}

export enum IDKind {
  YoutubeChannel = "youtube#channel",
}

export enum ItemKind {
  YoutubeSearchResult = "youtube#searchResult",
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: LiveBroadcastContent;
  publishTime: Date;
}

export enum LiveBroadcastContent {
  None = "none",
  Upcoming = "upcoming",
}

export interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
}

export interface Default {
  url: string;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
