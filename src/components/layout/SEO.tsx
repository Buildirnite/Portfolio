import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://buildirnite.github.io/portfolio';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const TITLE = 'Ronald Trejo — Desarrollador Full-Stack | Santiago, Chile';
const OG_TITLE = 'Ronald Trejo — Desarrollador Full-Stack';
const DESCRIPTION =
  'Egresado de Ingeniería en Informática (Universidad Mayor). Especializado en React, Laravel, Python y React Native. Con experiencia práctica en el Ministerio del Medio Ambiente. Disponible para oportunidades en Santiago de Chile.';
const KEYWORDS =
  'desarrollador full stack chile, react developer santiago, laravel developer chile, react native, python fastapi, portfolio programador chile, ronald trejo';

export default function SEO() {
  return (
    <Helmet>
      {/* Primary */}
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="author" content="Ronald Trejo" />
      <link rel="canonical" href={SITE_URL} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={OG_TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_CL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={OG_TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}
