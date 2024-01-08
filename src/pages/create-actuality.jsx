import { Helmet } from 'react-helmet-async';

import { CreateActualityView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function CreateActualityPage() {
  return (
    <>
      <Helmet>
        <title> Création Actualité | COMICI </title>
      </Helmet>

      <CreateActualityView />
    </>
  );
}
