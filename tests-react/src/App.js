import Dropdown from "./components/dropdown";
import { useState } from "react";

function App() {
  const [selectedLang, setSelectedLang] = useState(null);
  return (
    <div>
      {selectedLang}
      <Dropdown
        options={["python", "java", "javascript", "c"]}
        title={"selecione sua linguagem preferida"}
        onSelect={(value) => setSelectedLang(value)}
      />
    </div>
  );
}

export default App;
