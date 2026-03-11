export interface AniListPageResponse {
  Page: {
    media: AniListMedia[];
  };
}

export interface AniListMedia {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string;
  };
  status: string;
  episodes: number | null;
  genres: string[];
  coverImage: {
    large: string;
  };
  description: string | null;
  trailer: {
    id: string;
    site: string;
  } | null;
  nextAiringEpisode: {
    airingAt: number;
    episode: number;
  } | null;
  streamingEpisodes: {
    site: string;
    url: string;
  }[];
  relations: {
    edges: {
      relationType: string;
    }[];
  };
}
