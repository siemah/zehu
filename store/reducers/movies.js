/**
 * @author siemah 
 * @version 1.0.0
 * some reducers for fetching movies and series
 * @var initialState from name it clear
 * @var fetchMoviesAndSeriesReducer the main reducer for movies/tv's
 */
export const initialState = {
  loading: false,
  trending: [],
  movies: [],
  series: [],
  message: null,
}

export const fetchMoviesAndSeriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INIT_FETCHING':
      return { ...state, loading: true, message: null, };
    case 'FULFILLED_GET_MOVIES':
      return { ...state, loading: false, movies: payload, message: null, };
    case 'REJECTED_GET_MOVIES':
      return { ...state, loading: false, message: payload };
    case 'FULFILLED_GET_SERIES':
      return { ...state, loading: false, series: payload, message: null, }
    case 'REJECTED_GET_SERIES':
      return { ...state, loading: false, message: payload }
    case 'FULFILLED_GET_MOVIES_AND_SERIES':
      return { ...state, loading: false, series: payload.series, movies: payload.movies, message: null, }
    default: return { ...state };
  }
};
