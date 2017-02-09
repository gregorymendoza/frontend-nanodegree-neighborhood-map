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
    	title: 'Plaza Las Américas',
    	location: {lat: 10.458384, lng: -66.828957},
    	flickrId: '208775634'
    }, {
    	title: 'Galerias Sebucan Shopping Mall',
    	location: {lat: 10.508163, lng: -66.832222},
    	flickrId: '5483506532'
    }];

// Create a map variable
var map;

// Create a new blank array for all the listing markers.
var markers = [];

infowindow = {};

// Function to initialize the map within the map div
function initMap() {
	var styles = [
	    {
	        "featureType": "administrative",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "on"
	            }, {
	                "lightness": 33
	            }
	        ]
	    }, {
	        "featureType": "landscape",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#f2e5d4"
	            }
	        ]
	    }, {
	        "featureType": "poi.park",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#c5dac6"
	            }
	        ]
	    }, {
	        "featureType": "poi.park",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "on"
	            }, {
	                "lightness": 20
	            }
	        ]
	    }, {
	        "featureType": "road",
	        "elementType": "all",
	        "stylers": [
	            {
	                "lightness": 20
	            }
	        ]
	    }, {
	        "featureType": "road.highway",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#c5c6c6"
	            }
	        ]
	    }, {
	        "featureType": "road.arterial",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#e4d7c6"
	            }
	        ]
	    }, {
	        "featureType": "road.local",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#fbfaf7"
	            }
	        ]
	    }, {
	        "featureType": "water",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "on"
	            }, {
	                "color": "#acbcc9"
	            }
	        ]
	    }
	]

	map = new google.maps.Map(document.getElementById('map-div'), {
		center: {lat: 10.480594, lng: -66.903606},
		zoom: 4,
		styles: styles,
		mapTypeControl: false
	});

    //var largeInfowindow = new google.maps.InfoWindow();
    infowindow.largeInfowindow = new google.maps.InfoWindow();

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
			icon: 'img/mall-default.png',
			id: i
		});

		// Push the marker to our array of markers.
		markers.push(marker);
		locations[i].marker = marker;

		// Create an onclick event to open the large infowindow at each marker.
		marker.addListener('click', function() {
			populateInfoWindow(this, infowindow.largeInfowindow);
		});

		// Two event listeners - one for mouseover, one for mouseout,
		// to change the colors back and forth.
		marker.addListener('mouseover', function() {
			this.setIcon('img/mall-highlighted.png');
		});
		marker.addListener('mouseout', function() {
			this.setIcon('img/mall-default.png');
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
		// Clear the infowindow content to give the streetview time to load.
		infowindow.setContent('');
		infowindow.marker = marker;

		function FlickrPhoto(title, owner, flickrURL, imageURL) {
		    this.title = title;
		    this.owner = owner;
		    this.flickrURL = flickrURL;
		    this.imageURL = imageURL;
		}

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
		            }
		        };

		        $.ajax(ajaxOptions);
		    }
		}

		var flickrService = new FlickrService();
		flickrService.getPhotoInfo(marker.flickrId, function(photo) {
    		// Make sure the marker property is cleared if the infowindow is closed.
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});

			infowindow.setContent('<div>' + marker.title + '</div>' + '<img class="mall-thumbnail" src="' + photo.imageURL + '"/>');

			infowindow.open(map, marker);
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
 	//marker: ko.observableArray(locations),
 	self.filteredLocs = ko.computed(function() {
 		var locs = self.locs();
        var filter = self.filter();
        if (!filter) {
        	for (var i = 0; i < locs.length; i++) {
        		locs[i].marker.setVisible(true);
        	}
            return locs;
        } else {
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

    self.mallClicked = function(data) {
    	for (var i=0; i < locations.length; i++) {
    		if (data.title == locations[i].title) {
    			populateInfoWindow(locations[i].marker, infowindow.largeInfowindow);
    		}
    	}
    	console.log(data.title);
    }
};