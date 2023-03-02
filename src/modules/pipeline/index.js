
import Header from 'components/Header';
import ModelRenderer from './components/ModelRenderer';

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
