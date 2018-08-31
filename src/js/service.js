import request from './request';

//unused Get helper function
const formatParams = (params) => {
    return "?" + Object
            .keys(params)
            .map(function(key){
            return key+"="+encodeURIComponent(params[key])
            })
            .join("&")
    } 

export let findAll = ()=>{
    var query={};
    var url = './data/emp_data.json'+formatParams(query);   
    
    // return request({url:"testData.json"})
    return request({
             url: url,
             method: "GET",
             dataType: 'jsonp',
             crossDomain: false,
             data: query,            
         }).then(retData => retData = JSON.parse(retData))
}