export default function StemPlayer({ stems }) {
  return (
    <div>
      <h2>Stem Analysis</h2>
      <ul>
        {Object.entries(stems).map(([key, value]) => (
          <li key={key}>{key}: {Math.round(value * 100)}%</li>
        ))}
      </ul>
    </div>
  );
}