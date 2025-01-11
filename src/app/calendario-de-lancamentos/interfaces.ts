export interface JikanAnimeGetSeasonNowResponse {
  data?: JikanAnime[] | null;
  pagination: Pagination;
}
export interface JikanAnime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles?: TitlesEntity[] | null;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms?: string[] | null;
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers?:
    | ProducersEntityOrLicensorsEntityOrStudiosEntityOrGenresEntityOrExplicitGenresEntityOrThemesEntityOrDemographicsEntity[]
    | null;
  licensors?:
    | ProducersEntityOrLicensorsEntityOrStudiosEntityOrGenresEntityOrExplicitGenresEntityOrThemesEntityOrDemographicsEntity[]
    | null;
  studios?:
    | ProducersEntityOrLicensorsEntityOrStudiosEntityOrGenresEntityOrExplicitGenresEntityOrThemesEntityOrDemographicsEntity[]
    | null;
  genres?:
    | ProducersEntityOrLicensorsEntityOrStudiosEntityOrGenresEntityOrExplicitGenresEntityOrThemesEntityOrDemographicsEntity[]
    | null;
  explicit_genres?:
    | ProducersEntityOrLicensorsEntityOrStudiosEntityOrGenresEntityOrExplicitGenresEntityOrThemesEntityOrDemographicsEntity[]
    | null;
  themes?:
    | ProducersEntityOrLicensorsEntityOrStudiosEntityOrGenresEntityOrExplicitGenresEntityOrThemesEntityOrDemographicsEntity[]
    | null;
  demographics?:
    | ProducersEntityOrLicensorsEntityOrStudiosEntityOrGenresEntityOrExplicitGenresEntityOrThemesEntityOrDemographicsEntity[]
    | null;
}
interface Images {
  jpg: JpgOrWebp;
  webp: JpgOrWebp;
}
interface JpgOrWebp {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}
interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}
interface TitlesEntity {
  type: string;
  title: string;
}
interface Aired {
  from: string;
  to: string;
  prop: Prop;
}
interface Prop {
  from: FromOrTo;
  to: FromOrTo;
  string: string;
}
interface FromOrTo {
  day: number;
  month: number;
  year: number;
}
interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}
interface ProducersEntityOrLicensorsEntityOrStudiosEntityOrGenresEntityOrExplicitGenresEntityOrThemesEntityOrDemographicsEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  items: Items;
}
interface Items {
  count: number;
  total: number;
  per_page: number;
}
