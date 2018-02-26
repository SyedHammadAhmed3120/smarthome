var queryFields = [ 'sort', 'order', 'fields', 'limit', 'skip' ];
var restrictedFields = [ 'password', 'authToken', 'saltRounds' ];
var comparingFields = [ '$gt', '$gte', '$lt', '$lte' ];

var limit = function(limit) {
    return parseInt(limit);
}

var skip = function(skip) {
    return parseInt(skip);
}

var select = function(fields) {
    return fields.split(',').filter(f => !restrictedFields.includes(f));
}

var sort = function(field, order) {
    var obj = { };
    obj[field] = order;
    return [].push(obj);
}

var where = function(query) {
    var selector = { };
    for(var key in query) {
        if(queryFields.includes(key)) {
            continue;
        }
        
        var optionValues = query[key].split(',');
        if(optionValues.length > 1) {
            if(!query[key].includes(':')) {
                selector['$or'] = [];
                optionValues.forEach(function(o) {
                    var obj = { };
                    obj[key] = o;
                    selector['$or'].push(obj);
                });
                continue;
            }
            
            if((query[key].match(/:/g) || []).length == 2) {
                selector['$and'] = [];
                optionValues.forEach(function(o) {
                    var comparisionValues = o.split(':');
                    
                    if(!comparingFields.includes(comparisionValues[0])) {
                        throw new Error('Invalid comparision of param "' + key + '"');
                    } else {
                        var obj = { };
                        
                        if(isNaN(parseInt(comparisionValues[1]))) {
                            throw new Error('For param "' + key + '" range must be a number');
                        }
                        
                        obj[comparisionValues[0]] = parseInt(comparisionValues[1]);
                        selector['$and'].push(obj);
                    }
                });
            } else {
                throw new Error('In param "' + key + '" invalid query range parameters');
            }
        } else {
            var comparisionValues = query[key].split(':');
            if(comparisionValues.length == 2) {
                if(!comparingFields.includes(comparisionValues[0])) {
                    throw new Error('Invalid comparision of param "' + key + '"');
                } else {
                    var obj = { };
                    
                    if(isNaN(parseInt(comparisionValues[1]))) {
                        throw new Error('For param "' + key + '" range must be a number');
                    }
                    
                    obj[comparisionValues[0]] = parseInt(comparisionValues[1]);
                    selector[key] = obj;
                }
            } else if (comparisionValues.length = 1) {
                selector[key] = comparisionValues[0];
            } else {
                throw new Error('In param "' + key + '" invalid query range parameters');
            }
        }
    }
}

var buildQuery = function(query) {
    var cloudantQuery = { };
    
    if(query) {
        cloudantQuery.selector = where(query);
    }
    
    if(query.fields) {
        cloudantQuery.fields = select(query.fields);
    }
    
    if(query.limit) {
        cloudantQuery.limit = limit(query.limit);
    }
    
    if(query.skip) {
        cloudantQuery.limit = skip(query.skip);
    }
    
    if(query.sort) {
        cloudantQuery.sort = sort(query.sort, query.order || 'desc');
    }
    
    return cloudantQuery;
}

module.exports = {
    buildQuery = buildQuery
}