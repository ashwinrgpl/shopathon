import { useEffect } from 'react';

const DEFAULT_TITLE = 'Welcome To Shopathon';
const DEFAULT_DESCRIPTION = 'We sell the best products for cheap';
const DEFAULT_KEYWORDS = 'electronics, buy electronics, cheap electronics';

const upsertMeta = (name, content) => {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const Meta = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
}) => {
  useEffect(() => {
    document.title = title;
    upsertMeta('description', description);
    upsertMeta('keywords', keywords);

    // Fallback for screens that do not render <Meta />
    return () => {
      document.title = DEFAULT_TITLE;
      upsertMeta('description', DEFAULT_DESCRIPTION);
      upsertMeta('keywords', DEFAULT_KEYWORDS);
    };
  }, [title, description, keywords]);

  return null;
};

export default Meta;