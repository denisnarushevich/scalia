define(function(){
   var Item = {};
   
   Item.POINT = 0;
   Item.BOUNDS = 1;
   
   Item.Create = function(type, boundsOrPoint){
       return {
           type: type,
           data: boundsOrPoint
       }
   }
   
   return Item;
});