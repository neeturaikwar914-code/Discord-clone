import React, { useState } from "react";

export default function FxControls({ onApply }) {
  const [effect, setEffect] = useState("");

  return (
    <div className="effect-section">
      <select value={effect} onChange={(e) => setEffect(e.target.value)}>
        <option value="">Select Effect</option>
        <option value="reverb">Reverb</option>
        <option value="echo">Echo</option>
        <option value="bassboost">Bass Boost</option>
      </select>
      <button onClick={() => onApply(effect)}>Apply</button>
    </div>
  );
}