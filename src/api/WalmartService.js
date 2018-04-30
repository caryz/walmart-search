
const baseUri = "https://api.walmartlabs.com";
const apiKey = "xrn85m3k5yhbw2c2f47yzw2w";

class WalmartService {

  // v1/search?apiKey={apiKey}&query={query}
  searchUri = `${baseUri}/v1/search?apiKey=${apiKey}&query={query}`;

  // v1/items?apiKey={apiKey}&upc=035000521019
  productLookupUri = `${baseUri}/v1/items/{itemId}?apiKey=${apiKey}`;

  // v1/nbp?apiKey={apiKey}&itemId={itemID}
  recommendationsUri = `${baseUri}/v1/nbp?apiKey=${apiKey}&itemId={itemId}`;

  search(query) {
    return this.request(this.searchUri.replace("{query}", query));
  }

  productLookup(itemId) {
    return this.request(this.productLookupUri.replace("{itemId}", itemId));
  };

  recommendations(itemId) {
    return this.request(this.recommendationsUri.replace("{itemId}", itemId));
  }

  handleErrors(res) {
    if(!res.ok) {
      console.error(res.statusText);
    }
    return res
  }

  request(url, options) {
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        console.error(res.statusText);
      })
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  // TODO: resolve CORS issue
  // request = (url, options) => {
  //   const defaultOptions = {
  //     mode: 'no-cors'
  //   }

  //   return fetch(url, defaultOptions)
  //     .then(response => {
  //       console.log('response ok');
  //       console.log(response.json());
  //       return response;
  //     })
  //     // .catch(error => {
  //     //   console.error("Error fetching request");
  //     //   console.error(error);
  //     //   return Promise.reject(error);
  //     // });
  // };
}

export default WalmartService;
