angular.module('starter.controllers', [])



.controller('AppCtrl', function($scope,$http,$stateParams,$cordovaPush,$ionicPlatform){
            //alert("hi");
            
            
            
            // notification code
            
            //};
            
            // Notification Received
            
            // push notification code end
            
            
            
            
            
            
            $http.get('http://getwellbyoga.org/yoga/getvalues.php?type=disease').then(function(resp) {
                                                                                      
                                                                                      window.localStorage.setItem("DISEASES",JSON.stringify(resp.data));
                                                                                      });
            $http.get('http://getwellbyoga.org/yoga/getyogas.php').then(function(resp) {
                                                                        //alert(JSON.stringify(resp.data));
                                                                        window.localStorage.setItem("YOGAS",JSON.stringify(resp.data));
                                                                        });
            $http.get('http://getwellbyoga.org/yoga/getallvids.php').then(function(resp) {
                                                                          //alert(JSON.stringify(resp.data));
                                                                          window.localStorage.setItem("ALLVIDS",JSON.stringify(resp.data));
                                                                          });
            // cache the list of diseases
            $scope.reload = function(){
            //alert("reload");
            $http.get('http://getwellbyoga.org/yoga/getvalues.php?type=disease').then(function(resp) {
                                                                                      
                                                                                      window.localStorage.setItem("DISEASES",JSON.stringify(resp.data));
                                                                                      });
            $http.get('http://getwellbyoga.org/yoga/getyogas.php').then(function(resp) {
                                                                        //alert(JSON.stringify(resp.data));
                                                                        window.localStorage.setItem("YOGAS",JSON.stringify(resp.data));
                                                                        });
            $http.get('http://getwellbyoga.org/yoga/getallvids.php').then(function(resp) {
                                                                          //alert(JSON.stringify(resp.data));
                                                                          window.localStorage.setItem("ALLVIDS",JSON.stringify(resp.data));
                                                                          });
            
            }
            
            if(window.localStorage.getItem("DISEASES") === null){
            $http.get('http://getwellbyoga.org/yoga/getvalues.php?type=disease').then(function(resp) {
                                                                                      $scope.cDiseases = resp.data;
                                                                                      //alert(JSON.stringify(resp.data));
                                                                                      window.localStorage.setItem("DISEASES",JSON.stringify(resp.data));
                                                                                      });
            
            }
            
            // cache yogas in each diseases.
            
            
            
            if(window.localStorage.getItem("ALLVIDS") === null){
            $http.get('http://getwellbyoga.org/yoga/getallvids.php').then(function(resp) {
                                                                          
                                                                          // $scope.cYogas = resp.data;
                                                                          //alert(JSON.stringify(resp.data));
                                                                          
                                                                          window.localStorage.setItem("ALLVIDS",JSON.stringify(resp.data));
                                                                          });
            
            }
            
            
            if(window.localStorage.getItem("YOGAS") === null){
            $http.get('http://getwellbyoga.org/yoga/getyogas.php').then(function(resp) {
                                                                        
                                                                        $scope.cYogas = resp.data;
                                                                        //alert(JSON.stringify(resp.data));
                                                                        
                                                                        window.localStorage.setItem("YOGAS",JSON.stringify(resp.data));
                                                                        });
            
            }
            
                       
            
            })


.directive('autoListDivider', function($timeout) {
           var lastDivideKey = "";
           
           return {
           link: function(scope, element, attrs) {
           var key = attrs.autoListDividerValue;
           
           var defaultDivideFunction = function(k){
           return k;
           }
           
           var doDivide = function(){
           var divideFunction = scope.$apply(attrs.autoListDividerFunction) || defaultDivideFunction;
           var divideKey = divideFunction(key);
           
           if(divideKey != lastDivideKey) {
           var contentTr = angular.element("<div class='item item-divider'>"+divideKey+"</div>");
           element[0].parentNode.insertBefore(contentTr[0], element[0]);
           }
           
           lastDivideKey = divideKey;
           }
           
           $timeout(doDivide,0)
           }
           }
           })

.controller('ViewFavsCtlr', function($scope,$http,$stateParams,$state){
            
            var elements = window.localStorage.getItem("FAVS");
            //console.log(elements);
            $scope.items = JSON.parse(elements);
            $scope.goToMediaPage = function(name,data,easyvid,label,type,icon,description){
            //alert(data+','+easyvid+','+label+','+type+','+icon+','+description);
            var element= { name:name,label:label, description: description, data: data, image: 'media/'+icon, type: type,easyvid:easyvid,icon:icon};
            selectedYoga = element;
            $state.go('app.showmedia');
            
            }

            
            })

.controller('YogaCtlr', function($scope,$http,$stateParams,$ionicModal){
            
            
            $scope.modal = $ionicModal.fromTemplate('<div class="modal" ng-controller="FeedbackCtlr"><header class="bar bar-header bar-positive"> <h1 class="title">Feedback Form</h1><div class="button button-clear" ng-click="modal.hide()"><span class="icon ion-close"></span></div></header><content has-header="true" padding="true"><div class = "list"><label class = "item item-input item-stacked-label"><br/><br/><span class = "input-label">Your Name</span><input ng-model="feedbackName" placeholder = "Your Name" /></label><label class = "item item-input item-stacked-label"><span class = "input-label">Your Email</span><input placeholder = "Your Email" ng-model="feedbackEmail" /></label><label class = "item item-input item-stacked-label"><span class = "input-label">Feedback</span><textarea placeholder="Write Comment" rows="8" cols="10" ng-model="feedbackMsg"></textarea></label><button class="button button-full" ng-click="submitFeedback()">Submit Feedback</button><br/><b><div style="left:4px;">&nbsp;&nbsp;Your Previous Feedbacks</b><ion-list><ion-item ng-repeat="item in mitems">{{item.message}}</ion-item></ion-list></div></div></div>', {
                                                    scope: $scope,
                                                    animation: 'slide-left-right'
                                                    });
            
            dialogHandle = $scope.modal;

            
            var cachedelements = window.localStorage.getItem("FAVS");
            if(cachedelements != null && cachedelements.length > 0){
            
                var elements = JSON.parse(cachedelements);
                $scope.favLabel = "Add to Favorite";
                for(i = 0;i<elements.length; i++){
            
                    var element = elements[i];
                    console.log("selected yoga name="+selectedYoga.name + "   element name="+element.name)
                    if(element.name == selectedYoga.name){
                        $scope.favLabel = "Remove from Favorite";
            
            
                        break;
                    }
                }
            
            
            
            } else {
            $scope.favLabel = "Add to Favorite";
            }

            
            
            
            
            // toggle action for faverite, if exists in faverite list then remove
            // if does not exist then add
    $scope.addToFav = function(){
            //alert("addfav");
            //console.log("fav label="+$scope.favLabel);
            if($scope.favLabel == "Remove from Faverite"){
            
               $scope.favLabel = "Add to Faverite"
            
            } else {
               $scope.favLabel = "Remove from Faverite";
            }
            
            
            var elements = window.localStorage.getItem("FAVS");
            var removed = false;
            
            if(elements === null || elements.length == 0){
                elements = [];
                elements.push(selectedYoga);
                window.localStorage.setItem("FAVS",JSON.stringify(elements));
                console.log(elements);
            } else {
            
            //if already exists in faverites list, then remove it
                elements1=JSON.parse(elements);
                for(i = 0;i<elements1.length; i++){
            
                    var element = elements1[i];
                    if(element.name == selectedYoga.name){
                        elements1.splice(i,1);
                        window.localStorage.setItem("FAVS",JSON.stringify(elements1));
                        removed = true;
                        break;
                    }
                }
            
                if(!removed){
                    elements1.push(selectedYoga);
            
                    window.localStorage.setItem("FAVS",JSON.stringify(elements1));
                }
            
            }
        }
            
           
            
            
            
            
            // check if selectedYoga is present in faverites
            
            // initialize the button label based on availability of this element in the list
            
            
    
              var url = selectedYoga.data;
            
            var easyvid = selectedYoga.easyvid;
            
           
            
            
            if(easyvid.length > 0){
            document.getElementById("switch").style.display = 'block';
            document.getElementById("switch_b").style.display = 'none';
            } else {
            document.getElementById("switch").style.display = 'none';
            document.getElementById("switch_b").style.display = 'block';
            
            }
            // $scope.apply();
            
            //alert(url + "," + easyvid);
            
            
            var iconname = selectedYoga.data.split(".")[0];
            $scope.imgSrc = "media/"+iconname+".jpg";
            
            
            
            
            $scope.changeVid = function(){
            
            //alert($scope.easyMode);
            
            if($scope.easyMode){
            url = selectedYoga.easyvid;
            } else {
            url = selectedYoga.data;
            }
            
            
            }
            
            
            $scope.playVid = function(){
            //alert("playvid");
            //alert(url);
            
            var options = {
            successCallback: function() {
            console.log("Video was closed without error.");
            //window.plugins.streamingMedia.suspend();
            },
            errorCallback: function(errMsg) {
            console.log("Error! " + errMsg);
            alert(errMsg);
            },
            //orientation: 'landscape'
            };
            
            var path =  "http://d1dcu4sbskithe.cloudfront.net/"+encodeURIComponent(url);
            
            if(url.indexOf(".mp3")>0){
                var options = {
                    bgColor: "#FFFFFF",
                    bgImage: "https://s3-us-west-2.amazonaws.com/getwellbyoga-yoga/default.png",
                    bgImageScale: "fit", // other valid values: "stretch"
            
                    successCallback: function() {
                        console.log("Player closed without error.");
                    },
                    errorCallback: function(errMsg) {
                            console.log("Error! " + errMsg);
                    }
                };
            
               window.plugins.streamingMedia.playAudio(path,options);
            } else {
            
            //alert(path);
                window.plugins.streamingMedia.playVideo(path,options);
            }
            //            if(cordova.platformId == 'ios'){
            //                            window.plugins.streamingMedia.playVideo(path,options);
            //            } else {
            //            alert(path);
            //             VideoPlayer.play(path);
            //            }
            
            
            
            }
            
            $scope.goBack = function(){
            window.history.back();
            }
            })

.controller('FeedbackCtlr', function($scope,$http,$stateParams){
            
            $scope.$on('modal.shown', function() {
                       console.log('Modal is shown!');
                       $http({
                             method: 'POST',
                             url: 'https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/getFeedbackByContext',
                             data: data
                             }).then(function successCallback(response) {
                                     // this callback will be called asynchronously
                                     // when the response is available
                                     console.log(JSON.stringify(response.data.Items));
                                     $scope.mitems = response.data.Items;
                                     //$scope.apply();
                                     
                                     }, function errorCallback(response) {
                                     // called asynchronously if an error occurs
                                     // or server returns response with an error status.
                                     });
                       
                       
                       
            });
            
            if(window.localStorage.getItem("USER")!=null){
                $scope.feedbackName = window.localStorage.getItem("USER");
            }
            
            if(window.localStorage.getItem("EMAIL")!=null){
                $scope.feedbackEmail = window.localStorage.getItem("EMAIL");
            }
            //alert("here");
            var data={
                identifier:$scope.feedbackName+"#"+$scope.feedbackEmail+"#"+selectedDisease+"#"+selectedYoga.name
            
            };
           
           
            
            $scope.submitFeedback = function(){
            window.localStorage.setItem("USER",$scope.feedbackName);
            window.localStorage.setItem("EMAIL",$scope.feedbackEmail);
            
            var data={
            identifier:$scope.feedbackName+"#"+$scope.feedbackEmail+"#"+selectedDisease+"#"+selectedYoga.name,
            
                message:$scope.feedbackMsg
            
            
            
            };
            
            var config = {
                headers : {
                    'Content-Type' : 'application/json'
            
                    }
            };
            $http.post('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/feedbackFunction', JSON.stringify(data));
            
            dialogHandle.hide();
          
            
                    //alert(JSON.stringify(data));
            }
          
            })




.controller('ViewDetailsCtlr', function($scope,$http,$stateParams,$ionicLoading,$state){
            
            //addFav('{{item.data}}','{{item.easyvid}}','{{ item.label }}','{{ item.type }}','{{ item.icon }}','{{ item.description }}')
            
            $scope.goToMediaPage = function(name,data,easyvid,label,type,icon,description){
              //alert(data+','+easyvid+','+label+','+type+','+icon+','+description);
            var element= { name:name, label:label, description: description, data: data, image: 'media/'+icon, type: type,easyvid:easyvid,icon:icon};
              selectedYoga = element;
            $state.go('app.showmedia');
            
            }
            
            $scope.setData = function(data){
            alert(data);
            return;
            }
            
            $scope.toggleItem= function(item) {
            if ($scope.isItemShown(item)) {
            $scope.shownItem = null;
            } else {
            $scope.shownItem = item;
            }
            };
            $scope.isItemShown = function(item) {
            return $scope.shownItem === item;
            };
            
            $scope.show = function() {
            $ionicLoading.show({
                               template: 'Loading...'
                               });
            };
            $scope.hide = function(){
            $ionicLoading.hide();
            };
            
            
            $scope.loadData = function(){
            
            //aler("refresh");
            $scope.images = [];
            $scope.show();
            
            // alert(window.localStorage.getItem("YOGAS"));
            
            selectedDisease = $stateParams.type;
            
            resp = JSON.parse(window.localStorage.getItem("YOGAS"))[$stateParams.type];
            //alert(resp);
            console.log(resp);
            
            
            $scope.items = [];
            
            //console.log('Success', resp);
            
            
            
            for(var i = 0; i < resp.length; i++) {
            
            var element= { name: resp[i][0],label:resp[i][5], description: resp[i][1], data: resp[i][2], image: 'media/'+resp[i][2].split('.')[0]+'.jpg', type: resp[i][4],easyvid:resp[i][6],icon:resp[i][2].split('.')[0]+'.jpg'};
            
            
            $scope.items.push(element);
            }
            $scope.hide();
            
            
            }
            
            
            
            
            
            
            
            
            })




.controller('YogaListCtlr', function($scope,$http,$stateParams,$ionicLoading,$ionicScrollDelegate){
            
            //alert($stateParams.type);
            /* $scope.download = function(name){
             
             
             var url = "http://cdn.wall-pix.net/albums/art-space/00030109.jpg";
             var targetPath = cordova.file.documentsDirectory + "testImage.png";
             var trustHosts = true;
             var options = {};
             
             $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
             .then(function(result) {
             // Success!
             alert("success"+result);
             }, function(err) {
             // Error
             alert(err);
             }, function (progress) {
             $timeout(function () {
             $scope.downloadProgress = (progress.loaded / progress.total) * 100;
             });
             });
             }*/
            
            // sort by name
            
            
            
            
            $scope.input = {};
          
            $scope.show = function() {
            $ionicLoading.show({
                               template: 'Loading...'
                               });
            };
            $scope.hide = function(){
            $ionicLoading.hide();
            };
            
            
            $scope.loadImages = function(){
            //aler("refresh");
            $scope.images = [];
            $scope.show();
            //alert(window.localStorage.getItem("DISEASES"));
            resp = JSON.parse(window.localStorage.getItem("DISEASES"));
            $scope.items = [];
            
            
            //resp.data.reverse();
            // For JSON responses, resp.data contains the result
            for(var i = 0; i < resp.length; i++) {
            var element = {};
            if($stateParams.type == "60"){
            console.log(resp[i][5]);
                if(resp[i][5].indexOf("-60")>0){
                    //console.log("creating element");
                    element= { label: resp[i][0],name: resp[i][5],description: resp[i][1], data: resp[i][2], image: resp[i][3].replace("-60",""), type: resp[i][4]};
                    $scope.items.push(element);
                }
            
            } else {
            
                if(resp[i][5].indexOf("-60")< 0){
                    element= { label: resp[i][0],name: resp[i][5],description: resp[i][1], data: resp[i][2], image: resp[i][3], type: resp[i][4]};
                    $scope.items.push(element);
                }
            }
            
            //console.log("adding element to list");
            
            
            }
            $scope.hide();
            
            
            };
            $scope.sortItems = function(){
            //alert("sorting");
            
            $scope.items.sort(function(a, b) {
                       var nameA = a.label.toUpperCase(); // ignore upper and lowercase
                       var nameB = b.label.toUpperCase(); // ignore upper and lowercase
                       if (nameA < nameB) {
                       return -1;
                       }
                       if (nameA > nameB) {
                       return 1;
                       }
                       
                       // names must be equal
                       return 0;
                       });

            $scope.update();
            
            
            };
            
            
            
            
            
            
            
            
            })


.controller('AllVidCtlr', function($scope,$http,$stateParams,$ionicLoading,$ionicScrollDelegate){
            
            
            
            $scope.scrollTop = function() {
            $ionicScrollDelegate.scrollTop();
            };
            
            $scope.scrollBottom = function() {
            $ionicScrollDelegate.scrollBottom();
            };
            $scope.show = function() {
            $ionicLoading.show({
                               template: 'Loading...'
                               });
            };
            $scope.hide = function(){
            $ionicLoading.hide();
            };
            
            
            $scope.loadImages = function(){
            //aler("refresh");
            $scope.images = [];
            $scope.show();
            //alert(window.localStorage.getItem("DISEASES"));
            resp = JSON.parse(window.localStorage.getItem("ALLVIDS"));
            $scope.items = [];
            
            
            //resp.data.reverse();
            // For JSON responses, resp.data contains the result
            for(var i = 0; i < resp.length; i++) {
            
            var element= { label: resp[i][1],name: resp[i][1], data: resp[i][6], type: resp[i][5],image:"icons/anusirsanamodified.jpeg"};
            
            
            $scope.items.push(element);
            }
            $scope.hide();
            
            
            }
            
            
            
            
            
            
            
            
            })

.controller('ConfigVideoCtlr', function($scope,$http,$stateParams,$ionicLoading,$ionicScrollDelegate){
            
            
            
            $scope.scrollTop = function() {
            $ionicScrollDelegate.scrollTop();
            };
            
            $scope.scrollBottom = function() {
            $ionicScrollDelegate.scrollBottom();
            };
            $scope.show = function() {
            $ionicLoading.show({
                               template: 'Loading...'
                               });
            };
            $scope.hide = function(){
            $ionicLoading.hide();
            };
            
            
            $scope.loadImages = function(){
            //aler("refresh");
            $scope.images = [];
            $scope.show();
            
            //alert($stateParams.type);
            $http.get('http://getwellbyoga.org/yoga/listvids.php').then(function(resp) {
                                                                        
                                                                        
                                                                        $scope.items = [];
                                                                        
                                                                        // console.log('Success', resp);
                                                                        //resp.data.reverse();
                                                                        // For JSON responses, resp.data contains the result
                                                                        for(var i = 0; i < resp.data.length; i++) {
                                                                        
                                                                        var element= { name : "http://getwellbyoga.org/yogamedia/"+resp.data[i] };
                                                                        
                                                                        
                                                                        
                                                                        $scope.items.push(element);
                                                                        }
                                                                        $scope.hide();
                                                                        
                                                                        }, function(err) {
                                                                        console.error('ERR', err);
                                                                        // err.status will contain the status code
                                                                        alert("error"+err.message);
                                                                        })
            
            
            }
            
            
            
            
            
            
            
            
            })






.controller('YogaTypeListCtlr', function($scope,$http,$stateParams){
            
            
            
            $scope.loadData = function(){
            //aler("refresh");
            $scope.images = [];
            
            //alert($stateParams.type);
            $http.get('http://getwellbyoga.org/yoga/getconfigtypes.php?source='+$stateParams.type).then(function(resp) {
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        $scope.items = [];
                                                                                                        
                                                                                                        console.log('Success', resp);
                                                                                                        //resp.data.reverse();
                                                                                                        // For JSON responses, resp.data contains the result
                                                                                                        for(var i = 0; i < resp.data.length; i++) {
                                                                                                        
                                                                                                        var element= { name: resp.data[i][0] , image: resp.data[i][1]};
                                                                                                        
                                                                                                        
                                                                                                        $scope.items.push(element);
                                                                                                        }
                                                                                                        
                                                                                                        }, function(err) {
                                                                                                        console.error('ERR', err);
                                                                                                        // err.status will contain the status code
                                                                                                        alert("error"+err.message);
                                                                                                        })
            
            
            }
            
            
            
            
            
            
            
            
            })








.controller('listCtlr_schedule', function($scope,$http) {
            var schedules;
            
            
            
            $scope.loadSchedule = function(){
            
            $http.get('http://getwellbyoga.org/bssmobile/news_test.php?control=SCHEDULE_LIST').then(function(resp) {
                                                                                                    //$scope.news = resp.data;
                                                                                                    schedules = resp.data;
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    $scope.bssschedules = [];
                                                                                                    
                                                                                                    for (var i=0; i<schedules.length; i++) {
                                                                                                    
                                                                                                    $scope.bssschedules[i] = {
                                                                                                    name: schedules[i].indexOf("|") > 0? schedules[i].split("|")[0] : schedules[i],
                                                                                                    bssschedulesitems: [" "]
                                                                                                    };
                                                                                                    for (var j=0; j<schedules.length; j++){
                                                                                                    $scope.bssschedules[i].bssschedulesitems[0] = schedules[i].indexOf("|") > 0? schedules[i].split("|")[1] : "Puja starts at 6 PM";
                                                                                                    }
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    }
                                                                                                    
                                                                                                    
                                                                                                    /*
                                                                                                     * if given group is the selected group, deselect it
                                                                                                     * else, select the given group
                                                                                                     */
                                                                                                    $scope.toggleGroup = function(bssschedule) {
                                                                                                    if ($scope.isGroupShown(bssschedule)) {
                                                                                                    $scope.shownGroup = null;
                                                                                                    } else {
                                                                                                    $scope.shownGroup = bssschedule;
                                                                                                    }
                                                                                                    };
                                                                                                    $scope.isGroupShown = function(bssschedule) {
                                                                                                    return $scope.shownGroup === bssschedule;
                                                                                                    };
                                                                                                    });
            };
            
            })


.controller("AlbumCtlr", function($scope,$http,$ionicModal,$stateParams) {
            
            $scope.images = [];
            
            $scope.refreshImages = function(){
            //aler("refresh");
            $scope.images = [];
            $http.get('http://getwellbyoga.org/bssmobile/listfiles.php').then(function(resp) {
                                                                              
                                                                              console.log('Success', resp);
                                                                              resp.data.reverse();
                                                                              // For JSON responses, resp.data contains the result
                                                                              for(var i = 0; i < resp.data.length; i++) {
                                                                              $scope.images.push({id: i, src: "http://getwellbyoga.org/bssmobile/uploads/thumbs/"+resp.data[i],origsrc: "http://getwellbyoga.org/bssmobile/uploads/"+resp.data[i]});
                                                                              }
                                                                              
                                                                              }, function(err) {
                                                                              console.error('ERR', err);
                                                                              // err.status will contain the status code
                                                                              alert("error"+err);
                                                                              })
            
            
            }
            
            
            $scope.loadImages = function() {
            
            if($scope.images.length == 0){
            //alert($scope.images.length);
            $scope.refreshImages();
            }
            
            }
            
            
            $ionicModal.fromTemplateUrl('image-modal.html', {
                                        scope: $scope,
                                        animation: 'slide-in-up'
                                        }).then(function(modal) {
                                                $scope.modal = modal;
                                                });
            
            $scope.openModal = function() {
            $scope.modal.show();
            };
            
            $scope.closeModal = function() {
            $scope.modal.hide();
            };
            
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                       $scope.modal.remove();
                       });
            // Execute action on hide modal
            $scope.$on('modal.hide', function() {
                       // Execute action
                       });
            // Execute action on remove modal
            $scope.$on('modal.removed', function() {
                       // Execute action
                       });
            $scope.$on('modal.shown', function() {
                       console.log('Modal is shown!');
                       });
            
            $scope.showImage = function(imagesource) {
            //alert(imagesource);
            $scope.imageSrc = imagesource;
            
            $scope.openModal();
            };
            
            // $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';
            //
            //            $scope.showImage = function(index) {
            //            switch(index) {
            //            case 1:
            //            $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';
            //            break;
            //            case 2:
            //            $scope.imageSrc  = 'http://ionicframework.com/img/ionic_logo.svg';
            //            break;
            //            case 3:
            //            $scope.imageSrc  = 'http://ionicframework.com/img/homepage/phones-weather-demo@2x.png';
            //            break;
            //            }
            //            $scope.openModal();
            //            }
            
            
            
            })


.factory('broadcast', function ($rootScope, $document) {
         var _events = {
         onPause: 'onPause',
         onResume: 'onResume'
         };
         
         $document.bind('resume', function () {
                        _publish(_events.onResume, null);
                        });
         
         $document.bind('pause', function () {
                        _publish(_events.onPause, null);
                        });
         
         function _publish(eventName, data) {
         $rootScope.$broadcast(eventName, data)
         }
         return {
         events: _events
         }
         });






