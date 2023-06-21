import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import BannerBackground from "../../Assets/home-banner-background.png";

import Map from "@arcgis/core/Map";
import Mesh from "@arcgis/core/geometry/Mesh.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import esriRequest from "@arcgis/core/request";
import HaiChieu from "../../Data/HaiChieu.geojson";
import Data from '../../Data/Data'
import hoatietLen from "../../Data/Sketchup/sketchup1.glb";
import hoatietXuong from "../../Data/Sketchup/sketchup2.glb";

import hoatiet_mattruoc from "../../Data/Sketchup/hoatiet_mattruoc.glb";
import hoatiet_phaitren from "../../Data/Sketchup/hoatiet_phaitren.glb";
import hoatiet_phaiduoi from "../../Data/Sketchup/hoatiet_phaiduoi.glb";
import hoatiet_traitren from "../../Data/Sketchup/hoatiet_traitren.glb";
import hoatiet_traiduoi from "../../Data/Sketchup/hoatiet_traiduoi.glb";
import hoatiet_matsau from "../../Data/Sketchup/hoatiet_matsau.glb";
import trumai_congchinh from "../../Data/Sketchup/trumai_congchinh.glb";
import trutangG from "../../Data/Sketchup/trutangG.glb";
import trutangG_matsau from "../../Data/Sketchup/trutangG_matsau.glb";

import hoa1 from "../../Data/Sketchup/flower1.glb";
import hoa2 from "../../Data/Sketchup/flower2.glb";
import hoa4 from "../../Data/Sketchup/flower4.glb";
import hoa8 from "../../Data/Sketchup/flower8.glb";
import hoa9 from "../../Data/Sketchup/flower9.glb";


import tennvh from "../../Data/Sketchup/tennvh.glb";
import { pos_tennvh, positionHoatiet_matruoc, positionHoatiet_matsau, positionHoatiet_phaiduoi, positionHoatiet_phaitren, positionHoatiet_traiduoi, positionHoatiet_traitren, truCaoGiua, truMatsau, truNganXungQuanh, posHoa1, posHoa2, posHoa4, posHoa8, posHoa9 } from "../../Data/prositions";


function ModelPage() {
  const mapRef = useRef(null);
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
  const [state, setState] = useState(Data)
  const template = {
    title: "{BuildingName}",
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
          { value: 1, color: "#E3E3E3" },
          { value: 2, color: "#CCCCCC" },
          { value: 3, color: [153, 217, 234, 0.2] },
          { value: 50, color: "green" },
          { value: 75, color: "#086E9C" }, // màu  bảng tên
          { value: 100, color: "#99FFFF" }, // màu tường phòng
          { value: 150, color: "#CCE5FF" }, // màu ghế ngoài
          { value: 5000, color: "red" },
        ],
      },
    ],
  };

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // create a new blob from geojson featurecollection
    const blob = new Blob([JSON.stringify(state)], {
      type: "application/json"
    });

    // URL reference to the blob
    const url = URL.createObjectURL(blob);
    // create new geojson layer using the blob url

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

    if (visible) {
      for (var i = 0; i < positionHoatiet_matruoc.length; i++) {
        Mesh.createFromGLTF(positionHoatiet_matruoc[i], hoatiet_mattruoc)
          .then(function (geometry) {
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill"
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success")
          })
          .catch(console.error);
      }
      for (var i = 0; i < positionHoatiet_phaitren.length; i++) {
        Mesh.createFromGLTF(positionHoatiet_phaitren[i], hoatiet_phaitren)
          .then(function (geometry) {
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill"
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success")
          })
          .catch(console.error);
      }
      for (var i = 0; i < positionHoatiet_phaiduoi.length; i++) {
        Mesh.createFromGLTF(positionHoatiet_phaiduoi[i], hoatiet_phaiduoi)
          .then(function (geometry) {
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill"
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success")
          })
          .catch(console.error);
      }
      for (var i = 0; i < positionHoatiet_traitren.length; i++) {
        Mesh.createFromGLTF(positionHoatiet_traitren[i], hoatiet_traitren)
          .then(function (geometry) {
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill"
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success")
          })
          .catch(console.error);
      }
      for (var i = 0; i < positionHoatiet_traiduoi.length; i++) {
        Mesh.createFromGLTF(positionHoatiet_traiduoi[i], hoatiet_traiduoi)
          .then(function (geometry) {
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill"
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success")
          })
          .catch(console.error);
      }
      for (var i = 0; i < positionHoatiet_matsau.length; i++) {
        Mesh.createFromGLTF(positionHoatiet_matsau[i], hoatiet_matsau)
          .then(function (geometry) {
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill"
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success")
          })
          .catch(console.error);
      }
      for (var i = 0; i < positionHoatiet_matsau.length; i++) {
        Mesh.createFromGLTF(positionHoatiet_matsau[i], hoatiet_matsau)
          .then(function (geometry) {
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill"
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success")
          })
          .catch(console.error);
      }
      for (var i = 0; i < truNganXungQuanh.length; i++) {
        Mesh.createFromGLTF(truNganXungQuanh[i], trutangG)
          .then(function (geometry) {
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill"
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success")
          })
          .catch(console.error);
      }
      for (var i = 0; i < truCaoGiua.length; i++) {
        Mesh.createFromGLTF(truCaoGiua[i], trumai_congchinh)
          .then(function (geometry) {
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill"
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success")
          })
          .catch(console.error);
      }
      for (var i = 0; i < truMatsau.length; i++) {
        Mesh.createFromGLTF(truMatsau[i], trutangG_matsau)
          .then(function (geometry) {
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill"
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success")
          })
          .catch(console.error);
      }
      for (var j = 0; j < pos_tennvh.length; j++) {
        Mesh.createFromGLTF(pos_tennvh[j], tennvh)
          .then(function (geometry) {
            geometry.scale(0.85, { origin: pos_tennvh[j] });
            geometry.rotate(0, 0, 1);
            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill", // autocasts as new FillSymbol3DLayer()
                  material: {
                    color: [255, 227, 151, 1],
                    colorMixMode: "tint"
                  }
                }]
              }
            });

            view.graphics.add(graphic);
            console.log("success 1")
          })
          .catch(console.log("failed 1"));
      }
    }

                for (var i = 0; i < posHoa1.length; i++) {
                Mesh.createFromGLTF(posHoa1[i], hoa1)
                    .then(function (geometry) {
                        geometry.scale(1, { origin: posHoa1[i] });
                        geometry.rotate(0, 0, 0.6);
                        const graphic = new Graphic({
                            geometry,
                            symbol: {
                                type: "mesh-3d",
                                symbolLayers: [{
                                    type: "fill"
                                }]
                            }
                        });

                        view.graphics.add(graphic);
                        console.log("success flowwer1")
                    })
                    .catch(console.log("failed flowwer1"));
            }
            for (var i = 0; i < posHoa2.length; i++) {
                Mesh.createFromGLTF(posHoa2[i], hoa2)
                    .then(function (geometry) {
                        geometry.scale(1/25, { origin: posHoa2[i] });
                        geometry.rotate(0, 0, 0.6);
                        const graphic = new Graphic({
                            geometry,
                            symbol: {
                                type: "mesh-3d",
                                symbolLayers: [{
                                    type: "fill"
                                }]
                            }
                        });

                        view.graphics.add(graphic);
                        console.log("success flowwer2")
                    })
                    .catch(console.log("failed flowwer2"));
            }

            for (var i = 0; i < posHoa4.length; i++) {
                Mesh.createFromGLTF(posHoa4[i], hoa4)
                    .then(function (geometry) {
                        geometry.scale(1/33, { origin: posHoa4[i] });
                        geometry.rotate(0, 0, 0.6);
                        const graphic = new Graphic({
                            geometry,
                            symbol: {
                                type: "mesh-3d",
                                symbolLayers: [{
                                    type: "fill"
                                }]
                            }
                        });

                        view.graphics.add(graphic);
                        console.log("success flowwer4")
                    })
                    .catch(console.log("failed flowwer4"));
            }
            for (var i = 0; i < posHoa8.length; i++) {
                Mesh.createFromGLTF(posHoa8[i], hoa8)
                    .then(function (geometry) {
                        geometry.scale(2/3, { origin: posHoa8[i] });
                        geometry.rotate(0, 0, 0.6);
                        const graphic = new Graphic({
                            geometry,
                            symbol: {
                                type: "mesh-3d",
                                symbolLayers: [{
                                    type: "fill"
                                }]
                            }
                        });

                        view.graphics.add(graphic);
                        console.log("success flowwer8")
                    })
                    .catch(console.log("failed flowwer8"));
            }
            for (var i = 0; i < posHoa9.length; i++) {
                Mesh.createFromGLTF(posHoa9[i], hoa9)
                    .then(function (geometry) {
                        geometry.scale(1/18, { origin: posHoa9[i] });
                        geometry.rotate(0, 0, 0.6);
                        const graphic = new Graphic({
                            geometry,
                            symbol: {
                                type: "mesh-3d",
                                symbolLayers: [{
                                    type: "fill"
                                }]
                            }
                        });

                        view.graphics.add(graphic);
                        console.log("success flowwer1")
                    })
                    .catch(console.log("failed flowwer1"));
            }


    asyncFn();
  }, [state, visible]);
  const handleFunc = () => {
    console.log(Data.features[0].properties.idb)
    const result = Data.features.filter(item => item.properties.idb == 7)
    console.log(result)
    setState({ type: "FeatureCollection", features: [...result] })
  }
  return (
    <div className="home-container">
      <Header />
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>
      <div ref={mapRef} style={{ height: "100vh", width: "80vw", margin: '0 auto' }}></div>
      <button onClick={handleFunc}>Tang 1</button>
      <button onClick={() => { setVisible(!visible) }}>Visible</button>
      <Footer />
    </div>
  );
}

export default ModelPage;
