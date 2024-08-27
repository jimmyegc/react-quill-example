import { RichTextComponent } from "./components/RichTextComponent/RichTextComponent";
//import "./App.css";

function App() {    
  return (
    <>
      <h1>React-Quill 2.0.2</h1>      
      <RichTextComponent 
        isPreview={false}
        title={"Promoción de Agosto 2024"}
        placeholder="Ingrese el contenido aquí..." />
    </>
  );
}

export default App;
