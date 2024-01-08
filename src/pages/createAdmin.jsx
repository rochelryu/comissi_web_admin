import { Helmet } from 'react-helmet-async';

import { CreateAdminView } from 'src/sections/admin/view';

// ----------------------------------------------------------------------

export default function CreateAdminPage() {
  return (
    <>
      <Helmet>
        <title> Création Admin | COMICI </title>
      </Helmet>

      <CreateAdminView />
    </>
  );
}
