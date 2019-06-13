const initialState = {
  loading: false,
  articles: [],
  message: null,
}
// fetch articles reducer
export const fetchArticlesReducer =  (state=initialState, {type, payload}) => {
  switch (type) {
    case 'INIT_GET_ARTICLES':
      return { ...state, loading: true, message: null, };
    case 'FULFILLED_GET_ARTICLES':
      return { ...state, loading: false, articles: payload, message: null, }
    case 'REJECTED_GET_ARTICLES':
      return { ...state, loading: false, message: payload}
    default: return { ...state };
  }
};
