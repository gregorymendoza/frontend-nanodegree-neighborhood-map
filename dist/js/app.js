function initMap(){var a=[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"administrative.country",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"administrative.country",elementType:"labels.text",stylers:[{visibility:"simplified"}]},{featureType:"administrative.province",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"all",stylers:[{visibility:"simplified"},{saturation:"-100"},{lightness:"30"}]},{featureType:"administrative.neighborhood",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{visibility:"simplified"},{gamma:"0.00"},{lightness:"74"}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"landscape.man_made",elementType:"all",stylers:[{lightness:"3"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:17}]}];map=new google.maps.Map(document.getElementById("map-div"),{center:{lat:10.480594,lng:-66.903606},zoom:14,styles:a,mapTypeControl:!1}),infowindow.largeInfowindow=new google.maps.InfoWindow({pixelOffset:new google.maps.Size(0,5)});for(var b=0;b<locations.length;b++){var c=locations[b].location,d=locations[b].title,e=locations[b].flickrId,f=new google.maps.Marker({position:c,title:d,flickrId:e,animation:google.maps.Animation.DROP,icon:"img/mall-default.png"});markers.push(f),locations[b].marker=f,f.addListener("click",function(){populateInfoWindow(this,infowindow.largeInfowindow)}),f.addListener("mouseover",function(){this.setIcon("img/mall-highlighted.png")}),f.addListener("mouseout",function(){this.setIcon("img/mall-default.png")})}for(var g=new google.maps.LatLngBounds,b=0;b<markers.length;b++)markers[b].setMap(map),g.extend(markers[b].position);map.fitBounds(g),window.mapBounds=g,clearTimeout(gmapRequestTimeout),ko.applyBindings(new ViewModel)}function populateInfoWindow(a,b){function c(a,b,c,d){this.title=a,this.owner=b,this.flickrURL=c,this.imageURL=d}function d(){this.flickrApiKey="763559574f01aba248683d2c09e3f701",this.flickrGetInfoURL="https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&nojsoncallback=1&format=json",this.getPhotoInfo=function(a,b){var d={type:"GET",url:this.flickrGetInfoURL,data:{api_key:this.flickrApiKey,photo_id:a},dataType:"json",success:function(a){if("ok"==a.stat){var d=a.photo,e=d.title._content,f=d.owner.realname,g=d.urls.url[0]._content,h="https://farm"+d.farm+".staticflickr.com/"+d.server+"/"+d.id+"_"+d.secret+"_q.jpg",i=new c(e,f,g,h);b(i)}},error:function(){console.log("There was an error trying to load the Flickr API."),e.append('<div class="flickr-error"><em>Flickr photos not loading.</em></div>')}};$.ajax(d)}}if(b.marker!=a){b.setContent(""),b.marker=a,b.addListener("closeclick",function(){b.marker=null}),b.setContent('<div class="infowindow-wrapper"><div class="infowindow-title">'+a.title+"</div></div>"),b.open(map,a),map.panTo(a.position),map.panBy(0,-100);var e=$(".infowindow-wrapper"),f=new d;f.getPhotoInfo(a.flickrId,function(a){e.append('<img class="mall-thumbnail" src="'+a.imageURL+'"/>')})}}var locations=[{title:"Centro Sambil Chacao",location:{lat:10.489459,lng:-66.854343},flickrId:"3940245284"},{title:"El Recreo",location:{lat:10.491714,lng:-66.877137},flickrId:"435240710"},{title:"Fashion Mall Tolon",location:{lat:10.480487,lng:-66.860553},flickrId:"641477536"},{title:"Centro San Ignacio",location:{lat:10.4978,lng:-66.8565},flickrId:"2653309"},{title:"Centro Paseo El Hatillo",location:{lat:10.423652,lng:-66.824018},flickrId:"343577966"},{title:"Plaza Las Americas",location:{lat:10.458384,lng:-66.828957},flickrId:"208775634"},{title:"Galerias Sebucan Shopping Mall",location:{lat:10.508163,lng:-66.832222},flickrId:"5483506532"}],map,markers=[];infowindow={};var gmapRequestTimeout=setTimeout(function(){$("#gmap-error").removeClass("gmap-error-hidden")},7e3);window.addEventListener("resize",function(a){map.fitBounds(mapBounds)});var ViewModel=function(){var a=this;a.locs=ko.observableArray(locations),a.filter=ko.observable(),a.filteredLocs=ko.computed(function(){var b=a.locs(),c=a.filter();if(c)return ko.utils.arrayFilter(b,function(a){return a.title.toLowerCase().indexOf(c.toLowerCase())>=0?(a.marker.setVisible(!0),a):void a.marker.setVisible(!1)});for(var d=0;d<b.length;d++)b[d].marker.setVisible(!0);return b}),a.mallClicked=function(a){for(var b=0;b<locations.length;b++)a.title==locations[b].title&&populateInfoWindow(locations[b].marker,infowindow.largeInfowindow);console.log(a.title)}};