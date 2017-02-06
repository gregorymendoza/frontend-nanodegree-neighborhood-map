var locations = [{
    	title: 'Sambil',
    	location: {lat: 10.489459, lng: -66.854343},
    	visible: ko.observable(true)
    }, {
    	title: 'El Recreo',
    	location: {lat: 10.491714, lng: -66.877137},
    	visible: ko.observable(true)
    }, {
    	title: 'El Tolón',
    	location: {lat:  10.480487, lng: -66.860553},
    	visible: ko.observable(true)
    }, {
    	title: 'San Ignacio',
    	location: {lat: 10.4978, lng: -66.8565},
    	visible: ko.observable(true)
    }, {
    	title: 'Paseo El Hatillo',
    	location: {lat: 10.423652, lng: -66.824018},
    	visible: ko.observable(true)
    }, {
    	title: 'Plaza las Américas',
    	location: {lat: 10.458384, lng: -66.828957},
    	visible: ko.observable(true)
    }];

// Create a map variable
var map;

// Create a new blank array for all the listing markers.
var markers = [];

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

	map = new google.maps.Map(document.getElementById('mapDiv'), {
		center: {lat: 10.480594, lng: -66.903606},
		zoom: 4,
		styles: styles,
		mapTypeControl: false
	});

    var largeInfowindow = new google.maps.InfoWindow();

    // Style the markers a bit. This will be our listing marker icon.
	var defaultIcon = makeMarkerIcon('0091ff');

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('ffff24');

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
		// Get the position from the location array.
		var position = locations[i].location;
		var title = locations[i].title;

		// Create a marker per location, and put into markers array.
		var marker = new google.maps.Marker({
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			icon: defaultIcon,
			id: i
		});

		// Push the marker to our array of markers.
		markers.push(marker);
		locations[i].marker = marker;

		// Create an onclick event to open the large infowindow at each marker.
		marker.addListener('click', function() {
			populateInfoWindow(this, largeInfowindow);
		});

		// Two event listeners - one for mouseover, one for mouseout,
		// to change the colors back and forth.
		marker.addListener('mouseover', function() {
			this.setIcon(highlightedIcon);
		});
		marker.addListener('mouseout', function() {
			this.setIcon(defaultIcon);
		});
    }

    ko.applyBindings(new ViewModel);

    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = bounds;
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
		// Make sure the marker property is cleared if the infowindow is closed.
		infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
		});

		infowindow.setContent('<div>' + marker.title + '</div>');

		infowindow.open(map, marker);
	}
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
	var markerImage = new google.maps.MarkerImage(
		'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
		'|40|_|%E2%80%A2',
		new google.maps.Size(21, 34),
		new google.maps.Point(0, 0),
		new google.maps.Point(10, 34),
		new google.maps.Size(21,34));
	return markerImage;
}

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
});

var Mall = function(data) {
 	this.title = ko.observable(data.title);
}

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
};