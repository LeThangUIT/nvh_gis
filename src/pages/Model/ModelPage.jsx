import React, { useEffect, useRef } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

import Map from "@arcgis/core/Map";
import Mesh from "@arcgis/core/geometry/Mesh.js";
import Point from "@arcgis/core/geometry/Point.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import esriRequest from "@arcgis/core/request";
import HaiChieu from "../../Data/HaiChieu.geojson";
import BaChieu from "../../Data/BaChieu.geojson";

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

import tennvh from "../../Data/Sketchup/tennvh.glb";


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
  const url = BaChieu;

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
          { value: 1, color: "#E3E3E3" },
          { value: 2, color: "#CCCCCC" },
          { value: 50, color: "green" },
          { value: 75, color: "#086E9C"}, // màu  bảng tên
          { value: 100, color: [153, 217, 234] }, // màu tường phòng
          { value: 5000, color: "red" },
        ],
      },
    ],
  };
  const positionListLen = [
    new Point({
      x: 106.8010201969104,
      y: 10.8751415412143,
      z: 31.8,
    }),
    new Point({
      x: 106.8010216002598,
      y: 10.8751646243265,
      z: 31.8,
    }),
    new Point({
      x: 106.8010228976289,
      y: 10.8751867997302,
      z: 31.8,
    }),
    new Point({
      x: 106.8010242830173,
      y: 10.8752085891775,
      z: 31.8,
    })
  ];
  const positionListXuong = [
    new Point({
      x: 106.8010209251016,
      y: 10.8751532393889,
      z: 31.85,
    }),
    new Point({
      x: 106.8010223019298,
      y: 10.8751757163479,
      z: 31.85,
    }),
    new Point({
      x: 106.8010235345282,
      y: 10.8751976991819,
      z: 31.85,
    }),
    new Point({
      x: 106.8010249631636,
      y: 10.8752196206982,
      z: 31.85,
    })
  ];


  const positionHoatiet_matruoc = [
    new Point({
      x: 106.8010193294543,
      y: 10.8751022923646,
      z: 31.8,
    })
  ];
    const positionHoatiet_phaitren = [
    new Point({
      x: 106.800837279964,
      y: 10.8754337967085,
      z: 31.8,
    })
  ];
  const positionHoatiet_phaiduoi = [
    new Point({
      x: 106.8003574190074,
      y: 10.8755897588051,
      z: 31.8,
    })
  ];
  const positionHoatiet_traitren = [
    new Point({
      x: 106.8006765325014,
      y: 10.8746692876802,
      z: 31.8,
    })
  ];
  const positionHoatiet_traiduoi = [
    new Point({
      x: 106.8001653498866,
      y: 10.8748472530148,
      z: 31.8,
    })
  ];
  const positionHoatiet_matsau = [
    new Point({
      x: 106.8001954747037,
      y: 10.875250803292,
      z: 31.8,
    })
  ];
    const truNganXungQuanh = [
    // tru mat truoc
    new Point({
      x: 106.8008998090075,
      y: 10.8753143636202,
      z: 10.6,
    }),
    new Point({
      x: 106.8008967390142,
      y: 10.8752540526603,
      z: 10.6,
    }),
    new Point({
      x: 106.8008942486361,
      y: 10.875190917475,
      z: 10.6,
    }),
    new Point({
      x: 106.8008850601529,
      y: 10.8749906690041,
      z: 10.6,
    }),

    new Point({
      x: 106.8008822239574,
      y: 10.8749282137786,
      z: 10.6,
    }),
    new Point({
      x: 106.8008793862248,
      y: 10.8748645800804,
      z: 10.6,
    }),
    // tru trai tren
    new Point({
      x: 106.8008192164225,
      y: 10.8748155711794,
      z: 10.6,
    }),
    new Point({
      x: 106.8007472389364,
      y: 10.8747709015878,
      z: 10.6,
    }),
    new Point({
      x: 106.8005891143255,
      y: 10.8746730347463,
      z: 10.6,
    }),
    new Point({
      x: 106.8005071977604,
      y: 10.8746295372425,
      z: 10.6,
    }),
    // tru trai duoi
    new Point({
      x: 106.8004147392174,
      y: 10.8746621033312,
      z: 10.6,
    }),

    new Point({
      x: 106.800255805588,
      y: 10.8747942223917,
      z: 10.6,
    }),
    new Point({
      x: 106.8001691316963,
      y: 10.8748661417271,
      z: 10.6,
    }),
    // tru phai duoi
    new Point({
      x: 106.8001978353117,
      y: 10.8753802207828,
      z: 10.6,
    }),
    new Point({
      x: 106.8002754038429,
      y: 10.8754310557639,
      z: 10.6,
    }),
    new Point({
      x: 106.8003546972048,
      y: 10.8754828824904,
      z: 10.6,
    }),
    new Point({
      x: 106.8004333896031,
      y: 10.8755347940046,
      z: 10.6,
    }),
    new Point({
      x: 106.8005155295267,
      y: 10.8755751558578,
      z: 10.6,
    }),
    // tru phai tren
    new Point({
      x: 106.8007356830422,
      y: 10.875459315117,
      z: 10.6,
    }),
    new Point({
      x: 106.8008552961659,
      y: 10.875366526588,
      z: 10.6,
    })
  ];
  const truCaoGiua = [
    new Point({
      x: 106.8009012987711,
      y: 10.8751328247517,
      z: 16.8
    }),
    new Point({
      x: 106.8008974135815,
      y: 10.875048539353,
      z: 16.8
    })
  ];
  const truMatsau = [
    new Point({
      x: 106.8001222191377,
      y: 10.8752932001054,
      z: 10.6,
    }),
    new Point({
      x: 106.800118279629,
      y: 10.8752297547824,
      z: 10.6,
    }),
    new Point({
      x: 106.8001141236037,
      y: 10.8751663163001,
      z: 10.6,
    }),
    new Point({
      x: 106.8001099737203,
      y: 10.875099882461,
      z: 10.6,
    }),

    new Point({
      x: 106.8001058656165,
      y: 10.8750337330329,
      z: 10.6,
    }),
    new Point({
      x: 106.80010202505,
      y: 10.8749713576347,
      z: 10.6,
    })
  ];
  const pos_tennvh = [
    new Point({
      x: 106.8007635094252,
      y: 10.8752019002718,
      z: 35,
    })
  ];
  useEffect(() => {
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
    for (var i = 0; i < pos_tennvh.length; i++) {
      Mesh.createFromGLTF(pos_tennvh[i], tennvh)
        .then(function (geometry) {
          geometry.scale(0.85, { origin: pos_tennvh[i] });
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
