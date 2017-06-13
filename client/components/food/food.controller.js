FoodController.$inject = ['$state', 'FoodService'];

//food controllers
function FoodController($state, FoodService) {
  let vm = this;
  vm.message = "food";
  vm.savedFoods = [];

  vm.getAllFoods = function () {
    FoodService.getAllFoods()
      .then(function (response) {
        vm.savedFoods = response.data.food;
      })
    }
  vm.getAllFoods();

  vm.addFood = function() {
    FoodService.addFood(vm.newFood)
      .then(function(response) {
        console.log(vm.newFood);
        console.log(response.data.food);
        vm.savedFoods.push(response.data.food);
        vm.newFood = {};
        vm.addingNew = false;
      })
  }

  //redirect to the show page state for meal posts
  vm.foodShow = function (foodId) {
    $state.go('foodShow/:foodId', { foodId: foodId });
  }

  vm.likePost = function (foodToLike) {
    FoodService.likePost(foodToLike)
      .then(function success (response) {
        foodToLike.likes +=1;
      })
  }

}

module.exports = FoodController;
