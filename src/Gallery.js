import React, { useState, useEffect } from 'react';
import './App.css';
import Images from './components/Images/Images';
import axios from 'axios';

function App() {
  const [features,setFeatures] = useState([]) // to set the json data
  console.log(features)
  /*to call json server*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/features");
        setFeatures(response?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  /* used to generate background colour */
  const generateBackgroundColor = (index) => {
    const colors = [
      "#ffaaaa",
      "#aaffaa",
      "#aaaaff",
      "#ffa500",
      "#ff0000",
      "#87CEEB",
    ];
    return colors[index % colors.length];
  };
    return (
      <div className="galleryContainer">
          {features?.map((item, index) => (
            <div
              className="galleryBoxContainer"
              key={index}
              style={{ backgroundColor: generateBackgroundColor(index) }}
            >
              <div className="galleryInternalBox">
                <div className="galleryContentBox">
                  <Images image={item?.image} title={item?.title}  />
                  <p className="galleryTitle">{item?.title}</p>
                  <p className="galleryContent">{item.desc}</p>
                </div>
                <div>
                <Images image={item?.logo} title={item?.title} style={{ width: "50px" }} />
                </div>
              </div>
            </div>
          ))}
      </div>
    );
}

export default App;
