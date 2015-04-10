'use strict';

/**
 * @ngdoc function
 * @name comprasClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comprasClientApp
 */

 // pendente = 0
 // cancelado = 1
 // aprovado = 2
 // terminado = 3
angular.module('comprasClientApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    var alterState = function(order_id, action) {
      var data = { ordem_id: order_id };
      $http.post("http://localhost:8080/order/" + action, data)
          .success(function(data) {
            window.location.reload();
          });
    };

    var statusString = function(intStatus) {
      if (intStatus == 0) {
        return "Pendente"
      } else if (intStatus == 1) {
        return "Cancelado"
      } else if (intStatus == 2) {
        return "Aprovado"
      } else if (intStatus == 3) {
        return "Terminado"
      }
    };

    $scope.cancel = function(order_id) {
      alterState(order_id, "cancel");
    };

    $scope.approve = function(order_id) {
      alterState(order_id, "approve");
    };

    $scope.finish = function(order_id) {
      alterState(order_id, "finish");
    };

    $scope.items = [
      {
        id: 1,
        status: "Aprovado",
        status_id: 2,
        produtos: [
          {
            "produto_id": 10,
            "quantidade": 3,
            "valor": 1.53
          },{
            "produto_id": 10,
            "quantidade": 3,
            "valor": 1.53
          }
        ]
      },
      {
        id: 2,
        status: "Terminada",
        status_id: 3,
        produtos: [
          {
            "produto_id": 10,
            "quantidade": 3,
            "valor": 1.53
          }
        ]
      },
      {
        id: 3,
        status: "Pendente",
        status_id: 0,
        produtos: [
          {
            "produto_id": 10,
            "quantidade": 3,
            "valor": 1.53
          }
        ]

      },
    ];
    $http.get('http://localhost:8080/orders').success(function(data) {
      data.forEach(function(order) {
        order.status_id = order.status;
        order.status = statusString(order.status_id);
      })
      $scope.items = data;
    });
  }]);
