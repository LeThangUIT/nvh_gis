import React, { useEffect, useRef } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import esriRequest from "@arcgis/core/request";
import HaiChieu from "../../Data/HaiChieu.geojson";
import BacThang from "../../Data/BacThang.geojson";
function ModelPage() {
  const mapRef = useRef(null)
  //here
  //2D
  var createGraphic = function (data) {
    return new Graphic({
      geometry: data,
      symbol: data.symbol,
      attributes: data,
      popupTemplate: data.popupTemplate,
    });
  };

  const json_options = {
    query: {
      f: "json",
    },
    responseType: "json",
  };
  //
  //3d
  const url = BacThang;

  const template = {
    title: "{Building name}",
    content: "Height: {height}, color: {color}",

    // use a dynamically generated arcade expression within the popup:
    expressionInfos: [
      {
        id: "$feature['id']",
        name: "populationPerMile",
        title: "Population per Mile",
        expression: "$feature['height']/$feature['color']",
      },
    ],
  };

  var renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "polygon-3d", // autocasts as new PolygonSymbol3D()
      symbolLayers: [
        {
          type: "extrude", // autocasts as new ExtrudeSymbol3DLayer()
          material: { color: "red" },
          edges: {
            type: "solid", // autocasts as new SolidEdges3D()
            color: [50, 50, 50, 0.5],
          },
        },
      ],
    },
    label: "Population Density per County",

    // these visual variables are the key to "Extruding" the polygons
    visualVariables: [
      {
        type: "size",
        axis: "height",

        // field: "pop_2000",
        // normalizationField: "sq_miles",
        // we could use "field" and "normalizationField" like above, but in order to
        // extrude a minimum distance off the earth, lets use Arcade expression:
        valueExpression: "$feature['height']",
      },
      {
        type: "color",
        valueExpression: "$feature['color']",

        stops: [
          { value: 0, color: "white" },
          { value: 50, color: "green" },
          { value: 5000, color: "red" },
        ],
      },
    ],
  };

  
  useEffect( () => {
    const geojsonLayer = new GeoJSONLayer({
      url: url,
      copyright: "Houseculture",
      popupTemplate: template,
      renderer: renderer, //optional
    });
  
    var map = new Map({
      basemap: "topo-vector",
      layers: [geojsonLayer],
    });
  
    var viewOptions = {
      container: mapRef.current,
      map: map,
      camera: {
        position: [106.803838, 10.875093, 300],
        heading: 275,
        tilt: 50,
      },
    };
  
    var view = new SceneView(viewOptions);
    const asyncFn = async () => {
      const response = await esriRequest(HaiChieu, json_options);
      var graphicsLayer = new GraphicsLayer();
      await response.data.forEach(function (data) {
        graphicsLayer.add(createGraphic(data));
      });
      map.add(graphicsLayer);
    };
    asyncFn();
  }, []);

  return (
    <div className="home-container">
      <Header />
      <div ref={mapRef} style={{ height: "100vh" }}></div>
      <Footer />
    </div>
  );
}

export default ModelPage;
