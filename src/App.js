import React, { useRef, useState } from "react";

import GridLayer from "./components/GridLayer";
import MainStage from "./components/MainStage";
import ContentLayer from "./components/ContentLayer";
import Navbar from "./Prototype/Navbar";
import Button from "./UI/Button";
import RectShape from "./shapes/RectShape";
import CircleShape from "./shapes/CircleShape";

const App = () => {
  const [shapes, setShapes] = useState([]);
  const [connectors, setConnectors] = useState([]);
  const [count, setCount] = useState(0);
  const stageRef = useRef();

  const generateConnectors = (props) => {
    setConnectors(items => {
      return [...items, props];
    });
  };

  const createShape = (e) => {
    const shape = e.target.attributes.title.nodeValue;
    let insertedShape;
    const id = `target-${count}`;

    if (shape === "rect") {
      insertedShape = <RectShape
        key={Math.random().toString()}
        name="rect"
        stage={stageRef}
        id={id}
        generateConnectors={generateConnectors}
      />;
    }

    else if (shape === "circle") {
      insertedShape = <CircleShape
        key={Math.random().toString()}
        name="circle"
        stage={stageRef}
        id={id}
        generateConnectors={generateConnectors}
      />;
    }

    setShapes(items => {
      return [...items, insertedShape];
    });
    setCount(count + 1);
  };

  return (
    <div className="App" >
      <Navbar>
        <Button onClick={createShape} title="rect"></Button>
        <Button onClick={createShape} title="circle"></Button>
      </Navbar>
      <MainStage stageRef={stageRef}>
        <GridLayer />
        <ContentLayer
          shapes={shapes}
          connectors={connectors}
          stage={stageRef}
        />
      </MainStage>
    </div>
  );

};

export default App;