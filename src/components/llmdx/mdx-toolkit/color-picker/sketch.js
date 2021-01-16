import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = () => {
  const [color, setColor] = useState();
  const handleChange = color => setColor(color);
  return (
    <div style={{
      marginTop: "20px",
      marginBottom: "20px"
    }}>
      <SketchPicker color={color} onChangeComplete={handleChange} />
    </div>
  );
};

export default ColorPicker;
