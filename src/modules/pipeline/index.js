
import Header from 'components/Header';
import ModelRenderer from './components/ModelRenderer';

export default function PipelineScreen() {
  return (
    <div className='App'>

      <Header appName='Rurociąg' />
      <hr></hr>

      <main>
        <h2>Rurociąg</h2>
      </main>

      <ModelRenderer></ModelRenderer>

    </div>
  );
}
