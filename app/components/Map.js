'use client';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { MdLocationOn, MdScatterPlot } from 'react-icons/md';

const Map = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [markerCluster, setMarkerCluster] = useState(null);
  const [isClusterMode, setIsClusterMode] = useState(true);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Fetch coordinates from API
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coordinates`);
        const coordinates = await res.json();

        // Parse latitude and longitude as numbers
        coordinates.forEach(coord => {
          coord.latitude = parseFloat(coord.latitude);
          coord.longitude = parseFloat(coord.longitude);
        });

        // Load Google Maps
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          version: "weekly",
        });

        loader.load().then(() => {
          if (!window.google) {
            console.error("Google Maps API failed to load.");
            return;
          }

          // Initialize Google Map
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 22.5937, lng: 77.9629 }, // Center on India
            zoom: 5,
            styles: [
              { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
              { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] }
            ]
          });

          setMap(mapInstance);

          // Create markers
          const newMarkers = coordinates.map(coord => {
            return new google.maps.Marker({
              position: { lat: coord.latitude, lng: coord.longitude },
              icon: {
                url: `http://maps.google.com/mapfiles/ms/icons/${getRandomColor()}-dot.png`,
              }
            });
          });

          setMarkers(newMarkers);

          // Initialize MarkerClusterer with proper rendering
          const cluster = new MarkerClusterer({
            map: mapInstance,
            markers: newMarkers,
            renderer: {
              render({ count, position }) {
                return new google.maps.Marker({
                  position,
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: getRandomColor(),
                    fillOpacity: 0.6,
                    strokeColor: 'white',
                    strokeWeight: 2,
                    scale: Math.min(60, 30 + count * 2), // Cluster size scales with count
                  },
                  label: {
                    text: String(count), // Display count inside the cluster
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  },
                  zIndex: google.maps.Marker.MAX_ZINDEX + 1,
                });
              },
            },
          });

          setMarkerCluster(cluster);
          cluster.addMarkers(newMarkers);
        });
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();
  }, []);

  // Toggle between Cluster Mode and Marker Mode
  const toggleClusterMode = () => {
    if (!markerCluster) return;

    if (isClusterMode) {
      markerCluster.clearMarkers();
      markers.forEach(marker => marker.setMap(map));
    } else {
      markers.forEach(marker => marker.setMap(null));
      markerCluster.addMarkers(markers);
    }

    setIsClusterMode(!isClusterMode);
  };

  // Function to pick a random Google Maps marker color
  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "pink", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div style={{ position: 'relative' }}>
      <div ref={mapRef} style={{ height: '600px', width: '100%' }} />
      
      <button 
        onClick={toggleClusterMode} 
        style={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          backgroundColor: '#fff',
          border: 'none',
          borderRadius: '50%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '56px',
          height: '56px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        title={isClusterMode ? "Switch to Markers" : "Switch to Clusters"}
      >
        {isClusterMode ? (
          <MdLocationOn style={{ color: '#3f51b5', fontSize: '28px', transition: 'transform 0.3s ease', transform: 'rotate(360deg)' }} />
        ) : (
          <MdScatterPlot style={{ color: '#3f51b5', fontSize: '28px', transition: 'transform 0.3s ease', transform: 'rotate(0deg)' }} />
        )}
      </button>
    </div>
  );
};

export default Map;
