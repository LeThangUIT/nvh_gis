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
import Data from "../../Data/Data";

import hoatiet_mattruoc from "../../Data/Sketchup/hoatiet_mattruoc.glb";
import hoatiet_phaitren from "../../Data/Sketchup/hoatiet_phaitren.glb";
import hoatiet_phaiduoi from "../../Data/Sketchup/hoatiet_phaiduoi.glb";
import hoatiet_traitren from "../../Data/Sketchup/hoatiet_traitren.glb";
import hoatiet_traiduoi from "../../Data/Sketchup/hoatiet_traiduoi.glb";
import hoatiet_matsau from "../../Data/Sketchup/hoatiet_matsau.glb";
import trumai_congchinh from "../../Data/Sketchup/trumai_congchinh.glb";
import trutangG from "../../Data/Sketchup/trutangG.glb";
import trutangG_matsau from "../../Data/Sketchup/trutangG_matsau.glb";

// import hoa1 from "../../Data/Sketchup/flower1.glb";
// import hoa2 from "../../Data/Sketchup/flower2.glb";
// import hoa4 from "../../Data/Sketchup/flower4.glb";
import hoatietLen from "../../Data/Sketchup/hoatiet1.glb";
import hoatietXuong from "../../Data/Sketchup/hoatiet2.glb";
import hoatiet_matsau2 from "../../Data/Sketchup/hoatiet_matsau_2.glb"
import vietnam from "../../Data/Sketchup/vietnam.glb";
// import redflag from "../../Data/Sketchup/red_flag.glb";
import cotco from "../../Data/Sketchup/cotco.glb";
import testdata from "../../Data/Sketchup/vietnams_flag.glb";

import tennvh from "../../Data/Sketchup/tennvh.glb";
import {
  pos_tennvh,
  positionHoatiet_matruoc,
  positionHoatiet_matsau,
  positionHoatiet_phaiduoi,
  positionHoatiet_phaitren,
  positionHoatiet_traiduoi,
  positionHoatiet_traitren,
  truCaoGiua,
  truMatsau,
  truNganXungQuanh,
  // posHoa1,
  // posHoa2,
  // posHoa4,
  // posHoa8,
  // posHoa9,
  posredflag,
  posvnflag,
  poscotco,
  pos_tennvh_n,
  positionListLen1,
  positionListLen2,
  positionListLen3,
  positionListLen4,
  positionListLen5,
  positionListLen6,
  positionListLen7,
  positionListLen8,
  positionListLen9,
  positionListLen10,
  positionListLen11,
  positionListLen12,
  positionListLen13,
  positionListLen14,
  positionListLen15,
  positionListLen16,
  positionListLen17,
  positionListLen18,
  positionListLen19,
  positionListLen20,
  positionListLen21,
  positionListLen22,
  positionListLen23,
  positionListLen24,
  positionListLen25,
  positionListLen26,
  positionListLen27,
  positionListLen28,
  positionListLen29,
  positionListLen30,
  positionListXuong1,
  positionListXuong2,
  positionListXuong3,
  positionListXuong4,
  positionListXuong5,
  positionListXuong6,
  positionListXuong7,
  positionListXuong8,
  positionListXuong9,
  positionListXuong10,
  positionListXuong11,
  positionListXuong12,
  positionListXuong13,
  positionListXuong14,
  positionListXuong15,
  positionListXuong16,
  positionListXuong17,
  positionListXuong18,
  positionListXuong19,
  positionListXuong20,
  positionListXuong21,
  positionListXuong22,
  positionListXuong23,
  positionListXuong24,
  positionListXuong25,
  positionListXuong26,
  positionListXuong27,
  positionListXuong28,
  positionListXuong29,
  positionHoatiet_matsau2

} from "../../Data/prositions";

import { ModelPgae } from "./ModelPage.css";

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
  const [state, setState] = useState(Data);
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
          { value: 3, color: [153, 217, 234, 0.25] },
          { value: 50, color: "green" },
          { value: 75, color: "#086E9C" }, // màu  bảng tên
          { value: 100, color: "#99FFFF" }, // màu tường phòng
          { value: 150, color: "#CCE5FF" }, // màu ghế ngoài
          { value: 5000, color: "red" },
        ],
      },
    ],
  };

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // create a new blob from geojson featurecollection
    const blob = new Blob([JSON.stringify(state)], {
      type: "application/json",
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

      for (var i = 0; i < posredflag.length; i++) {
        Mesh.createFromGLTF(posredflag[i], testdata)
          .then(function (geometry) {
            geometry.rotate(0, 0, 0);
            geometry.scale(0.025, { origin: posredflag[i] });

            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });
            console.log("222222");

            view.graphics.add(graphic);
            console.log("success cờ ngoài");
          })
          .catch(console.error);
      }

      for (var i = 0; i < positionHoatiet_matruoc.length; i++) {
        Mesh.createFromGLTF(positionHoatiet_matruoc[i], hoatiet_mattruoc)
          .then(function (geometry) {
            console.log(positionHoatiet_matruoc);

            const graphic = new Graphic({
              geometry,
              symbol: {
                type: "mesh-3d",
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success");
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
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success");
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
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success");
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
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success");
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
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success");
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
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success");
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
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success");
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
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success");
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
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success");
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
                symbolLayers: [
                  {
                    type: "fill",
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success");
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
                symbolLayers: [
                  {
                    type: "fill", // autocasts as new FillSymbol3DLayer()
                    material: {
                      color: [255, 227, 151, 1],
                      colorMixMode: "tint",
                    },
                  },
                ],
              },
            });

            view.graphics.add(graphic);
            console.log("success 1");
          })
          .catch(console.log("failed 1"));
      }

      Mesh.createFromGLTF(positionListLen1, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 14);
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

      Mesh.createFromGLTF(positionListLen2, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 38);
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

      Mesh.createFromGLTF(positionListLen3, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 55);
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

      Mesh.createFromGLTF(positionListLen4, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 117);
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
      Mesh.createFromGLTF(positionListLen5, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 58);
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

      Mesh.createFromGLTF(positionListLen6, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 66);
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

      Mesh.createFromGLTF(positionListLen7, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 77);
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

      Mesh.createFromGLTF(positionListLen8, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 93);
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

      Mesh.createFromGLTF(positionListLen9, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 106);
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
      Mesh.createFromGLTF(positionListLen10, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 111);
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

      Mesh.createFromGLTF(positionListLen11, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 113);
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

      Mesh.createFromGLTF(positionListLen12, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 116);
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
      Mesh.createFromGLTF(positionListLen13, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 165);
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
      Mesh.createFromGLTF(positionListLen14, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 140);
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
      Mesh.createFromGLTF(positionListLen15, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 130);
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
      Mesh.createFromGLTF(positionListLen16, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 124);
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
      Mesh.createFromGLTF(positionListLen17, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 185);
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
      Mesh.createFromGLTF(positionListLen18, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 196);
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
      Mesh.createFromGLTF(positionListLen19, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 222);
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
      Mesh.createFromGLTF(positionListLen20, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 230);
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
      Mesh.createFromGLTF(positionListLen21, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 235);
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
      Mesh.createFromGLTF(positionListLen22, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 245);
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
      Mesh.createFromGLTF(positionListLen23, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 259);
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
      Mesh.createFromGLTF(positionListLen24, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 270);
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
      Mesh.createFromGLTF(positionListLen25, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 285);
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
      Mesh.createFromGLTF(positionListLen26, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 294);
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
      Mesh.createFromGLTF(positionListLen27, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 309);
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
      Mesh.createFromGLTF(positionListLen28, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 323);
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
      Mesh.createFromGLTF(positionListLen29, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 342);
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
      Mesh.createFromGLTF(positionListLen30, hoatietLen)
        .then(function (geometry) {
          geometry.rotate(0, 0, 350);
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
      Mesh.createFromGLTF(positionListXuong1, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 5);
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

      Mesh.createFromGLTF(positionListXuong2, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 31);
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

      Mesh.createFromGLTF(positionListXuong3, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 42);
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

      Mesh.createFromGLTF(positionListXuong4, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 54);
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

      Mesh.createFromGLTF(positionListXuong5, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 56);
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

      Mesh.createFromGLTF(positionListXuong6, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 58);
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

      Mesh.createFromGLTF(positionListXuong7, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 73);
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

      Mesh.createFromGLTF(positionListXuong8, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 84);
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

      Mesh.createFromGLTF(positionListXuong9, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 101);
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
      Mesh.createFromGLTF(positionListXuong10, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 110);
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

      Mesh.createFromGLTF(positionListXuong11, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 112);
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
      Mesh.createFromGLTF(positionListXuong12, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 114);
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
      Mesh.createFromGLTF(positionListXuong13, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 117);
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
      Mesh.createFromGLTF(positionListXuong14, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 155);
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
      Mesh.createFromGLTF(positionListXuong15, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 135);
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
      Mesh.createFromGLTF(positionListXuong16, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 127);
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
      Mesh.createFromGLTF(positionListXuong17, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 123);
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
      Mesh.createFromGLTF(positionListXuong18, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 190);
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
      Mesh.createFromGLTF(positionListXuong19, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 210);
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
      Mesh.createFromGLTF(positionListXuong20, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 233);
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
      Mesh.createFromGLTF(positionListXuong21, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 238);
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
      Mesh.createFromGLTF(positionListXuong22, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 252);
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
      Mesh.createFromGLTF(positionListXuong23, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 267);
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
      Mesh.createFromGLTF(positionListXuong24, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 275);
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
      Mesh.createFromGLTF(positionListXuong25, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 290);
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
      Mesh.createFromGLTF(positionListXuong26, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 303);
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
      Mesh.createFromGLTF(positionListXuong27, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 315);
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
      Mesh.createFromGLTF(positionListXuong28, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 330);
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
      Mesh.createFromGLTF(positionListXuong29, hoatietXuong)
        .then(function (geometry) {
          geometry.rotate(0, 0, 346);
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
                Mesh.createFromGLTF(positionHoatiet_matsau2, hoatiet_matsau2)
                    .then(function (geometry) {
                        geometry.rotate(0, 0, 3);
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


    Mesh.createFromGLTF(posvnflag, vietnam)
      .then(function (geometry) {
        geometry.scale(50, { origin: posvnflag });
        geometry.rotate(0, 0, 180);
        const graphic = new Graphic({
          geometry,
          symbol: {
            type: "mesh-3d",
            symbolLayers: [{
              type: "fill",
            }]
          }
        });

        view.graphics.add(graphic);
        console.log("success vn")
      })
      .catch(console.log("failed vn"));

    for (var i = 0; i < poscotco.length; i++) {
      Mesh.createFromGLTF(poscotco[i], cotco)
        .then(function (geometry) {
          geometry.scale(1, { origin: poscotco[i] });
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
          console.log("success cột cờ")
        })
        .catch(console.log("failed cột cờ"));
    }
    Mesh.createFromGLTF(pos_tennvh_n, tennvh)
      .then(function (geometry) {
        geometry.scale(0.5, { origin: pos_tennvh_n });
        geometry.rotate(0, 0, 0.6);
        const graphic = new Graphic({
          geometry,
          symbol: {
            type: "mesh-3d",
            symbolLayers: [{
              type: "fill", // autocasts as new FillSymbol3DLayer()
              material: {
                color: [255, 165, 0],
                colorMixMode: "tint"
              }
            }]
          }
        });

        view.graphics.add(graphic);
        console.log("tennvh ngoai")
      })
      .catch(console.log("tennvh ngoai"));
    asyncFn();
  }, [state, visible]);
  const handleFunc = (num) => {
    if (num === -1) {
      setState(Data);
    } else {
      const result = Data.features.filter(
        (item) => item.properties.idb === num || item.properties.idb === 0
      );
      setState({ type: "FeatureCollection", features: [...result] });
      setVisible(false);
    }
  };
  return (
    <div className="home-container">
      <Header />
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>
      <div className="background-content">
        <div
          ref={mapRef}
          style={{
            height: "100vh",
            width: "90vw",
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 3px 8px",
            margin: "0 auto",
          }}
        ></div>
        <div className="btn">
          <button onClick={() => handleFunc(-1)}>Tất cả</button>
          <button onClick={() => handleFunc(2)}>Tầng 2</button>
          <button onClick={() => handleFunc(3)}>Tầng 3</button>
          <button onClick={() => handleFunc(4)}>Tầng 4</button>
          <button onClick={() => handleFunc(5)}>Tầng 5</button>
          <button onClick={() => handleFunc(6)}>Tầng 6</button>
          {/* <button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          Visible
        </button> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ModelPage;
