import axios from "axios";
//sample url
// https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=27ee0cab99f04488b45526b7bae42efe&q=dublin&end_date=20021231&start_date=19730101&limit=10

export default {

// NY TIMES API GET

init: function (data, cb) {
    return new Promise((resolve, reject) => {
        
    // const BASEURL = "https://www.omdbapi.com/?t=";
    // const APIKEY = "&apikey=trilogy";
    console.log("ny times route");
    var BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=27ee0cab99f04488b45526b7bae42efe";
    // var query
    var searchQ = data.searchTerm;
    var limitAmt = data.noToRetrieve;
    var endY = data.endYear;
    var startY = data.startYear;


    if (searchQ === "") {
      alert("Search terms are required.");
      return;
    }

    BASEURL += "&q=" + searchQ;

    if (endY !== "") {
      endY = endY + "1231";
      BASEURL += "&end_date=" + endY;
    }

    if (startY !== "") {
      startY = startY + "0101";
      BASEURL += "&start_date=" + startY;
    }

    if (limitAmt === "") {
      limitAmt = 10;
    }

    BASEURL += "&limit=" + limitAmt;
      
        console.log("nytimes search");
        // return axios.get(BASEURL);
        return axios.get(BASEURL).catch(err => console.log(err))
        .then(res => {
            console.log(res.data.response.docs);
            resolve(res.data.response.docs);
        }).catch (reject);

        // return axios.get(BASEURL + query + APIKEY);
    
})
}

};

