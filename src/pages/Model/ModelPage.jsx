import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";


function ModelPage() {
  //here
  return (
    <div className="home-container">
      <Header />
        <div id="viewDiv" style={{height: '80vh'}}></div>
      <Footer />
    </div>
  );
}

export default ModelPage;
