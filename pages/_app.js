import '../styles/globals.css';
import '../styles/index.css';
import Layout from '../components/Layouts/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <div className="text-dark-900">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
