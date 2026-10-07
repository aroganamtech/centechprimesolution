import PageBanner from '../components/PageBanner';
import { Button } from '../components/Button';
import useSEO from '../hooks/useSEO';
export default function NotFound() {
  useSEO('Page not found');
  return (<PageBanner title="Page not found" tagline="The page you are looking for does not exist."><div className="mt-8"><Button to="/">Back to Home</Button></div></PageBanner>);
}
