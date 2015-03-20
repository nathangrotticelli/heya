angular.module('objectFilters', []).filter('orderObjectBy', function() {

  return function(items, field, reverse) {
     var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
     if(field=='Newest Watches'){
      filtered.reverse();
     }else if(field=='Most Popular'){
      filtered.sort(function (a, b) {
        return (a['watchLikes'].length < b['watchLikes'].length ? 1 : -1);
      });
     };
    return filtered;
  }
})



