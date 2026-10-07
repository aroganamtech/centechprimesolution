import { useEffect } from 'react';
export default function useSEO(title, description) {
  useEffect(() => {
    document.title = title ? `${title} – CenTech Prime Solutions` : 'CenTech Prime Solutions – Innovation Transformation Excellence';
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
