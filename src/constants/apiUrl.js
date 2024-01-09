
const base_url = 'https://bcomissi.shouz.network/api/admin'; // process.env.NODE_ENV === 'development' ? 'https://comici.loca.lt/api/admin':'api_prod/admin';
const base_url_asset = 'https://bcomissi.shouz.network/images'; // process.env.NODE_ENV === 'development' ? 'https://comici.loca.lt/images':'api_prod/admin';

export const apiUrl =  {
    authentication: `${base_url}/login`,
    // gestion admin
    addadmin: `${base_url}/addadmin`,
    getAlladmin: `${base_url}/getalladmin`,
    updateAdminprofil: `${base_url}/updateprofil`,
    updateAdminpassword: `${base_url}/updatepassword`,
    generateAdminpassword: `${base_url}/generatepassword`,
    // gestion departement
    createDepartement: `${base_url}/postdepartement`,
    allDepartements: `${base_url}/alldepartement`,
    updateDepartement: `${base_url}/updatedepartement`,
    // gestion competition
    createCompetition: `${base_url}/postcompetitions`,
    getCompetition: `${base_url}/getcompetition`,
    // gestion Event
    createEvent: `${base_url}/postevent`,
    detailEvent: `${base_url}/getdetailsevent`,
    addNumberNominate: `${base_url}/addnumbernominate`,
    toogleDisplayEvent: `${base_url}/changeetatevent`,

    // gestion candidate
    setNominate: `${base_url}/createnominate`,
    


    // gestion competition
    allCandidateActive: `${base_url}/getallcandidate`,

    // gestion actuality
    getAllactuality: `${base_url}/getactuality`,
    postactuality: `${base_url}/postactuality`,
}

export const apiUrlAsset =  {
    candidate: `${base_url_asset}/candidates`,
    avatars: `${base_url_asset}/avatars`,
    competitions: `${base_url_asset}/competitions`,
    events: `${base_url_asset}/events`,
    actualites: `${base_url_asset}/actualites`,
}