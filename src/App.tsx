// src/App.tsx
function App() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>No Gatekeeping Tools</h1>
      <p>Pick a tool to open:</p>

      <ul>
        <li>
          <a href="/src/pages/color-picker/color-picker.html">Color Picker</a>
        </li>
        <li>
          <a href="/src/pages/case-converter/case-converter.html">Case Converter</a>
        </li>
        <li>
          <a href="/src/pages/image-compressor/image-compressor.html">Image Compressor</a>
        </li>
        <li>
          <a href="/tools/palette/index.html" target="_blank" rel="noreferrer">
            Color Palette Generator
          </a>
        </li>
        {/* add more links as needed */}
      </ul>
    </main>
  );
}

export default App;
