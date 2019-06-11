import AsyncStorage from '@react-native-community/async-storage';

/**
 * @author siemah
 * @version 1.0.0
 * @note all of those under function return a Promise 
 *       and they return a values when the current promise is fulfilled
 * some helpers function 
 */

/**
 * @name saveArticle 
 * save the passed article to read latter
 * @param {Object} article contain list of item of the current articlie like title, content...
 * @return {Boolean} true if article saved with success otherwise false
 */
export const saveArticle = async article => {
  try {
    let currentArticles = await getListOfSavedArticles();
    let isExists = await getArticle(article.url);
    
    if (currentArticles.length && isExists === null )
      currentArticles = [ ...currentArticles, article];
    else 
      currentArticles = [ article ];

    currentArticles = JSON.stringify(currentArticles);
    await AsyncStorage.setItem('@articles', currentArticles);
    return true;
  } catch (error) {
    console.warn("Error saving ", error.message);
    return false;
  }
}

/**
 * @namre removeArticle 
 * delete an article from savedArticles list '@articles'
 * @param {String} url source url address
 * @return {Boolean} true when success or false 
 */
export const removeArticle = async url => {
  try {
    let articles = await getListOfSavedArticles();
    articles = articles.filter(article => article.url !== url);
    await AsyncStorage.setItem('@articles', JSON.stringify(articles));
    return true;
  } catch (error) {
    console.warn("Removing article error message: ", error.message);
    return false;
  }
}

/**
 * @name getArticle 
 * retrieve the article using url of source
 * @param {String} url link to current article
 * @return {Object} current article by url
 */
const getArticle = async url => {
  let articles = await getListOfSavedArticles();
  let article = articles.filter(art => art.url === url);
  return article.length 
          ? article[0] 
          : null;
}

/**
 * @name getListOfSavedArticles
 * retrieve all articles saved
 * @return {Array} list of articles
 */
export const getListOfSavedArticles = async () => {
  let articles = await getCurrentItem('@articles');
  return articles? JSON.parse(articles) : [];
}

/**
 * @name getCurrentItem 
 * check if the itemName is exist in AsyncStorage
 * @param {String} itemName name of item
 * @return {Mixed|null} the value of itemName
 */
export const getCurrentItem = async itemName => {
  try {
    let value = await AsyncStorage.getItem(itemName);
    return value;
  } catch (error) {
    return null;
  }
}