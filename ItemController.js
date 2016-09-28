var app = angular.module('myApp', []);
var attr_choices=['Name', 'Country'];
var object_array=[
      {Name:'Jani',Country:'Norway'},
      {Name:'Carl',Country:'Sweden'},
      {Name:'Margareth',Country:'England'},
      {Name:'Hege',Country:'Norway'},
      {Name:'Joe',Country:'Denmark'},
      {Name:'Gustav',Country:'Sweden'},
      {Name:'Birgit',Country:'Denmark'},
      {Name:'Mary',Country:'England'},
      {Name:'Kai',Country:'Norway'}
    ];
var welcome_message = "Hello Sir."
var items_removable = true;
var items_addable = true;
var items_sortable = false;
var items_searchable = false;
var items_editable = true;

var timed_functions=true;

app.controller('tableDataCtrl', function($scope, $timeout, $interval) {
    $scope.attr_choices = attr_choices;
    $scope.sort = $scope.attr_choices[0];
    $scope.attr = $scope.attr_choices[0];

    $scope.item_options = {};
    $scope.item_options.removable_items = items_removable;
    $scope.item_options.editable_items = items_editable;
    $scope.item_options.addable_items = items_addable;
    $scope.item_options.sortable_items = items_sortable;
    $scope.item_options.searchable_items = items_searchable;

    $scope.new_object={};

    $scope.myHeader = welcome_message;

    $scope.addObject = function (object) {
        $scope.add_obj={};
        $scope.edit_obj={};
        $scope.attr_choices.forEach(function(choice){
          $scope.add_obj[choice] = object[choice];
          $scope.edit_obj[choice] = false;
        });
        $scope.object_array.push($scope.add_obj);
        $scope.object_array_edit.push($scope.edit_obj);
        $scope.new_object={};
        //alert(JSON.stringify($scope.object_array));
    };

    $scope.removeObject = function (object) {
        var index = $scope.object_array.indexOf(object);
        $scope.object_array.splice(index, 1);   
        $scope.object_array_edit.splice(index, 1);     
        //alert(JSON.stringify($scope.object_array));
    };

    $scope.editObject = function (object) {
        var index = $scope.object_array.indexOf(object);
        for(i=0;i<$scope.object_array_edit.length;i++)
        {
          $scope.attr_choices.forEach(function(attr){
          if(i==index && $scope.object_array_edit[i][attr]==false){
            $scope.object_array_edit[i][attr]=true;
          }
          else {$scope.object_array_edit[i][attr]=false;}
        });
        }
    };

    $scope.theTime = new Date().toLocaleTimeString();
    if(timed_functions) {
      $interval(function () {
        $scope.theTime = new Date().toLocaleTimeString();
      }, 1000);

      $interval(function () {
          if($scope.myHeader == "How are you today?"){
            $scope.myHeader = "Hello Sir.";
          }
          else{
            $scope.myHeader = "How are you today?";
          }
        } , 6000);
    }

    $scope.object_array = object_array;
    $scope.object_array_edit=[];
    object_array.forEach(function(item){
      $scope.edit_obj={};
      $scope.attr_choices.forEach(function(choice){
          $scope.edit_obj[choice] = false;
      });      
      $scope.object_array_edit.push($scope.edit_obj);
    });
}); 

app.filter('searchFilteredByAttr', function() {
   // Create the return function and set the required parameter name to **input**
 	 return function(input, search, attr) { 	 
 	 	
 	 	output = [];
   		for(var item in input)
   			{
   				if(input[item][attr].contains(search, 0) || search==null || attr==null) {
   					output.push(input[item]);
   				}
   			}
   		return output;
  	}
});
