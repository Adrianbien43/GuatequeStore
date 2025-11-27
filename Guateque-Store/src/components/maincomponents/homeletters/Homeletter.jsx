import React from 'react';
import TextPressure from "../../maincomponents/homeletters/TextPressure";

export default function Homeletter() {
  return (
    <div style={{ position: 'relative', height: '300px' }}>
      <TextPressure
        text="Hello!"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        textColor="#000000ff"
        strokeColor="#000000ff"
        minFontSize={36}
      />
    </div>
  );
}
