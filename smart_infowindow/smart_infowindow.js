
var overlay;
smart_infowindow.prototype = new google.maps.OverlayView();


/** @constructor */
function smart_infowindow(opts) {

  this.options = new Object({
    map : false,

    background_color: '#fff',
    peak_image: false,
    max_height: 200,
    width: 100,
    lock_on_hover: false,
    distance_on_click: [],
    distance_on_hover: []
  });
  $.extend(true, this.options, opts);

  this.div_ = false;
  this.setMap(this.options.map);
}


smart_infowindow.prototype.onAdd = function() {

  var div = document.createElement('div');
  $(div).css('display' , 'none');
  $(div).css('position' , 'absolute');

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(this.div_);

};

smart_infowindow.prototype.draw = function() {
};


// hovers and clicks

smart_infowindow.prototype.openHover = function( marker, content ) {
  this.SetStyles();
  this.SetPosition(marker, false);
  this.SetContent(content);
};

smart_infowindow.prototype.openClick = function( marker, content ) {
  this.SetStyles();
  this.SetPosition(marker, true);
  this.SetContent(content);
};


//
// Private Setters
//
smart_infowindow.prototype.SetStyles = function() {
  $(this.div_).css('box-shadow', '0px 0px 10px #888' );
  $(this.div_).css('background-color', this.options.background_color );
  $(this.div_).css('width', this.options.width );
  $(this.div_).css('max-height', this.options.max_height );
};

smart_infowindow.prototype.SetPosition = function( marker, click_ev ) {
  var overlayProjection = this.getProjection();
  var canvas_point = overlayProjection.fromLatLngToDivPixel( marker.getPosition() );
  if(click_ev == true)
      this.options.map.setCenter(marker.getPosition());
  this.options.map.setCenter(marker.getPosition());
  this.div_.style.left = canvas_point.x + 'px';
  this.div_.style.top = canvas_point.y + 'px';
};

smart_infowindow.prototype.SetContent = function(content) {
  s_i_that = this;
  $(this.div_).html(content);
  $(this.div_).show();

  google.maps.event.addListener(this.options.map, 'click', function(){  $(s_i_that.div_).hide(); })
};


//
// Public Setters
//

smart_infowindow.prototype.SetDistanceOnClick = function( distances_array ) {
  this.options.distance_on_click = distances_array; 
};

smart_infowindow.prototype.SetDistanceOnHover = function( distances_array ) {
  this.options.distance_on_hover = distances_array;
};

smart_infowindow.prototype.SetWidth = function( width ) {
  this.options.width = width;
};

smart_infowindow.prototype.SetMaxHeight = function( max_height ) {
  this.options.max_height = max_height;
};
