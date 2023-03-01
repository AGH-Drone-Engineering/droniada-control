
import '../index.css';
import Header from '../Header';
import ModelRenderer from '../ModelRenderer';

export function PipelineScreen() {
  return (
    <div className='App'>

      <Header></Header>
      <hr></hr>

      <main>
        <h2>Rurociąg</h2>
      </main>

      <ModelRenderer></ModelRenderer>

    </div>
  );
}
