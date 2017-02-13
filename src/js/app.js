// Hard-coded list of locations.
// This represent our Model.
var locations = [{
    	title: 'Centro Sambil Chacao',
    	location: {lat: 10.489459, lng: -66.854343},
    	flickrId: '3940245284'
    }, {
    	title: 'El Recreo',
    	location: {lat: 10.491714, lng: -66.877137},
    	flickrId: '435240710'
    }, {
    	title: 'Fashion Mall Tolon',
    	location: {lat:  10.480487, lng: -66.860553},
    	flickrId: '641477536'
    }, {
    	title: 'Centro San Ignacio',
    	location: {lat: 10.4978, lng: -66.8565},
    	flickrId: '2653309'
    }, {
    	title: 'Centro Paseo El Hatillo',
    	location: {lat: 10.423652, lng: -66.824018},
    	flickrId: '343577966'
    }, {
    	title: 'Plaza Las Americas',
    	location: {lat: 10.458384, lng: -66.828957},
    	flickrId: '208775634'
    }, {
    	title: 'Galerias Sebucan Shopping Mall',
    	location: {lat: 10.508163, lng: -66.832222},
    	flickrId: '5483506532'
    }];

// Create a map variable.
var map;

// Create a new blank array for all the listing markers.
var markers = [];

// Create an empty infowindow object so it's content can be accessed globally.
infowindow = {};

// Function to initialize the map within the map div
function initMap() {
	// Create a styles array to use with the map.
	var styles = [
	    {
	        "featureType": "all",
	        "elementType": "labels.text.fill",
	        "stylers": [{
	                "saturation": 36
	            }, {
	                "color": "#000000"
	            }, {
	                "lightness": 40
	            }]
	    }, {
	        "featureType": "all",
	        "elementType": "labels.text.stroke",
	        "stylers": [{
	                "visibility": "on"
	            }, {
	                "color": "#000000"
	            }, {
	                "lightness": 16
	            }]
	    }, {
	        "featureType": "all",
	        "elementType": "labels.icon",
	        "stylers": [{
	                "visibility": "off"
	            }]
	    }, {
	        "featureType": "administrative",
	        "elementType": "geometry.fill",
	        "stylers": [{
	                "color": "#000000"
	            }, {
	                "lightness": 20
	            }]
	    }, {
	        "featureType": "administrative",
	        "elementType": "geometry.stroke",
	        "stylers": [{
	                "color": "#000000"
	            }, {
	                "lightness": 17
	            }, {
	                "weight": 1.2
	            }]
	    }, {
	        "featureType": "administrative",
	        "elementType": "labels",
	        "stylers": [{
	                "visibility": "off"
	            }]
	    }, {
	        "featureType": "administrative.country",
	        "elementType": "all",
	        "stylers": [{
	                "visibility": "simplified"
	            }]
	    }, {
	        "featureType": "administrative.country",
	        "elementType": "geometry",
	        "stylers": [{
	                "visibility": "simplified"
	            }]
	    }, {
	        "featureType": "administrative.country",
	        "elementType": "labels.text",
	        "stylers": [{
	                "visibility": "simplified"
	            }]
	    }, {
	        "featureType": "administrative.province",
	        "elementType": "all",
	        "stylers": [{
	                "visibility": "off"
	            }]
	    }, {
	        "featureType": "administrative.locality",
	        "elementType": "all",
	        "stylers": [{
	                "visibility": "simplified"
	            }, {
	                "saturation": "-100"
	            }, {
	                "lightness": "30"
	            }]
	    }, {
	        "featureType": "administrative.neighborhood",
	        "elementType": "all",
	        "stylers": [{
	                "visibility": "off"
	            }]
	    }, {
	        "featureType": "administrative.land_parcel",
	        "elementType": "all",
	        "stylers": [{
	                "visibility": "off"
	            }]
	    }, {
	        "featureType": "landscape",
	        "elementType": "all",
	        "stylers": [{
	                "visibility": "simplified"
	            }, {
	                "gamma": "0.00"
	            }, {
	                "lightness": "74"
	            }]
	    }, {
	        "featureType": "landscape",
	        "elementType": "geometry",
	        "stylers": [{
	                "color": "#000000"
	            }, {
	                "lightness": 20
	            }]
	    }, {
	        "featureType": "landscape.man_made",
	        "elementType": "all",
	        "stylers": [{
	                "lightness": "3"
	            }]
	    }, {
	        "featureType": "poi",
	        "elementType": "all",
	        "stylers": [{
	                "visibility": "off"
	            }]
	    }, {
	        "featureType": "poi",
	        "elementType": "geometry",
	        "stylers": [{
	                "color": "#000000"
	            }, {
	                "lightness": 21
	            }]
	    }, {
	        "featureType": "road",
	        "elementType": "geometry",
	        "stylers": [{
	                "visibility": "simplified"
	            }]
	    }, {
	        "featureType": "road.highway",
	        "elementType": "geometry.fill",
	        "stylers": [{
	                "color": "#000000"
	            }, {
	                "lightness": 17
	            }]
	    }, {
	        "featureType": "road.highway",
	        "elementType": "geometry.stroke",
	        "stylers": [{
	                "color": "#000000"
	            }, {
	                "lightness": 29
	            }, {
	                "weight": 0.2
	            }]
	    }, {
	        "featureType": "road.arterial",
	        "elementType": "geometry",
	        "stylers": [{
	                "color": "#000000"
	            }, {
	                "lightness": 18
	            }]
	    }, {
	        "featureType": "road.local",
	        "elementType": "geometry",
	        "stylers": [{
	                "color": "#000000"
	            }, {
	                "lightness": 16
	            }]
	    }, {
	        "featureType": "transit",
	        "elementType": "geometry",
	        "stylers": [{
	                "color": "#000000"
	            }, {
	                "lightness": 19
	            }]
	    }, {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [{
	                "color": "#000000"
	            }, {
	                "lightness": 17
	            }]
	    }]

	// Constructor creates a new map.
	map = new google.maps.Map(document.getElementById('map-div'), {
		center: {lat: 10.480594, lng: -66.903606},
		zoom: 14,
		styles: styles,
		mapTypeControl: false
	});

    // Tweak infowindow Y position.
    infowindow.largeInfowindow = new google.maps.InfoWindow({
    	pixelOffset: new google.maps.Size(0, 5)
    });

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
		// Get the position from the location array.
		var position = locations[i].location;
		var title = locations[i].title;
		var flickrId = locations[i].flickrId;

		// Create a marker per location, and put into markers array.
		var marker = new google.maps.Marker({
			position: position,
			title: title,
			flickrId: flickrId,
			animation: google.maps.Animation.DROP,
			icon: 'img/mall-default.png'
		});

		// Push the marker to our array of markers.
		markers.push(marker);
		locations[i].marker = marker;

		// Create an onclick event to open the large infowindow at each marker.
		marker.addListener('click', function() {
			populateInfoWindow(this, infowindow.largeInfowindow);
		});
    }

    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = bounds;

    ko.applyBindings(new ViewModel);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
		// Clear the infowindow content.
		infowindow.setContent('');
		infowindow.marker = marker;

		for (var i=0; i < locations.length; i++) {
			locations[i].marker.setIcon('img/mall-default.png');
		}

		marker.setIcon('img/mall-highlighted.png');

		// Make sure the marker property is cleared if the infowindow is closed.
		infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
			marker.setIcon('img/mall-default.png');
		});

		infowindow.setContent('<div class="infowindow-wrapper"><div class="infowindow-title">' + marker.title + '</div></div>');

		infowindow.open(map, marker);

		// Changes the center of the map to the given position and offset.
		map.panTo(marker.position);
		map.panBy(0, -100);

		var $infowindowElem = $('.infowindow-wrapper');

		function FlickrPhoto(title, owner, flickrURL, imageURL) {
		    this.title = title;
		    this.owner = owner;
		    this.flickrURL = flickrURL;
		    this.imageURL = imageURL;
		}

		// Load Flickr data.
		function FlickrService() {
	    	this.flickrApiKey = "763559574f01aba248683d2c09e3f701";
	    	this.flickrGetInfoURL = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&nojsoncallback=1&format=json";

		    this.getPhotoInfo = function(photoId, callback) {
		        var ajaxOptions = {
		            type: 'GET',
		            url: this.flickrGetInfoURL,
		            data: { api_key: this.flickrApiKey, photo_id: photoId },
		            dataType: 'json',
		            success: function (data) {
		                if (data.stat == "ok") {
		                    var photo = data.photo;
		                    var photoTitle = photo.title._content;
		                    var photoOwner = photo.owner.realname;
		                    var photoWebURL = photo.urls.url[0]._content;
		                    var photoStaticURL = "https://farm" + photo.farm + ".staticflickr.com/" +  photo.server + "/" + photo.id + "_" + photo.secret + "_q.jpg";

		                    var flickrPhoto = new FlickrPhoto(photoTitle, photoOwner, photoWebURL, photoStaticURL);
		                    callback(flickrPhoto);
		                }
		            }, error: function () {
    					console.log("There was an error trying to load the Flickr API.");
    					$infowindowElem.append('<div class="flickr-error"><em>Flickr photos not loading.</em></div>');
    				}
		        };

		        $.ajax(ajaxOptions);
		    }
		}

		var flickrService = new FlickrService();
		// Flickr photo data gets appended to the infowindow
		flickrService.getPhotoInfo(marker.flickrId, function(photo) {
			$infowindowElem.append('<img class="mall-thumbnail" src="' + photo.imageURL + '"/>');
		});
	}
}

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
});

var ViewModel = function() {
	var self = this;
	self.locs = ko.observableArray(locations);
	self.filter = ko.observable();
	self.gmapError = ko.observable(false);

	// This function will automatically trigger when the filter string value changes.
 	self.filteredLocs = ko.computed(function() {
 		var locs = self.locs();
        var filter = self.filter();

        infowindow.largeInfowindow.close();

        for (var i=0; i < locations.length; i++) {
			locations[i].marker.setIcon('img/mall-default.png');
		}

        if (!filter) {
        	// Shows all locations by default when text input value is cleared.
        	for (var i = 0; i < locs.length; i++) {
        		locs[i].marker.setVisible(true);
        	}
            return locs;
        } else {
        	// UI elements are dynamically shown and/or hidden based on the matched characters.
            return ko.utils.arrayFilter(locs, function(loc) {
            	if (loc.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
            		loc.marker.setVisible(true);
            		return loc;
            	} else {
            		loc.marker.setVisible(false);
            	}
            });
        }
    });

 	// Click binding function to open location info considering its title name.
    self.mallClicked = function(data) {
    	for (var i=0; i < locations.length; i++) {
    		if (data.title == locations[i].title) {
    			populateInfoWindow(locations[i].marker, infowindow.largeInfowindow);
    		}
    	}
    	console.log(data.title);
    }
};

function googleMapError() {
	gmapError(true);
}