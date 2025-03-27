nomCV = document.getElementById("nomCV");
infos = document.getElementById("infos");
Profil = document.getElementById('profil');
ajoutParcours = document.getElementById('ajoutParcours');
ajoutLangues = document.getElementById('ajoutLangues');
ajoutExperiences = document.getElementById('ajoutExperiences');
ajoutCompetences = document.getElementById('ajoutCompetences');
ajoutInterets = document.getElementById('ajoutInterets');

if(sessionStorage.getItem("infosCV")){
  infosCV = JSON.parse(sessionStorage.getItem("infosCV")) ;
}else{ 
  infosCV = {
  police : "Poppins",
  couleur : "#1f2e44",
  photo : "img/profil-defaut.png",
  nomCV : "nom cv",
  nom: "Votre nom",
  email: "Email",
  numero: "Numero",
  adresse: "Adresse",
  metier: "Metier",
  profil: "",
  parcours: [],
  cParcours : 0,
  langues: [],
  cLangues : 0,
  experiences: [],
  cExperiences : 0,
  competences: [],
  cCompetences : 0,
  interets: [],
  cInterets : 0
  }
} 
remplacerInfos(infosCV);
if(window.location.pathname === "/contenu.html" || window.location.pathname === "/SEN-CV/contenu.html"){
  updateParcours(infosCV);
  updateLangues(infosCV);
  updateExperiences(infosCV);
  updateCompetences(infosCV);
  updateInterets(infosCV);
}

function sauvegarderinfos(infosCV){
  sessionStorage.setItem("infosCV",JSON.stringify(infosCV));
}
function remplacerInfos(infosCV) {

  document.getElementById("photoCV").src = infosCV.photo;
  document.getElementById('nomcv').textContent = infosCV.nomCV;
  if(window.location.pathname === "/contenu.html" || window.location.pathname === "/SEN-CV/contenu.html"){
  document.getElementById('nom').textContent = infosCV.nom;  
  document.getElementById('email').textContent = infosCV.email;
  document.getElementById('numero').textContent = infosCV.numero;
  document.getElementById('adresse').textContent = infosCV.adresse; 
  document.getElementById('metier').textContent = infosCV.metier;
  }
  document.getElementById('cvNom').textContent = infosCV.nom;
  document.getElementById('cvEmail').textContent = infosCV.email;
  document.getElementById('cvNumero').textContent = infosCV.numero;
  document.getElementById('cvAdresse').textContent = infosCV.adresse;
  document.getElementById('cvMetier').textContent = infosCV.metier;
  document.getElementById('cvProfil').textContent = infosCV.profil;

  listeParcours = `<h4>Parcours scolaire</h4>`;
  infosCV.parcours.forEach((parcour) => {
    listeParcours += `<div class="fs-5 mb-1"><span class="fs-5 bartext-fill fw-medium"> ${parcour.debut}–${parcour.fin}</span><span class="d-block fs-6">${parcour.diplome}</span><p class="fs-7">${parcour.etablissement}</p></div>`
  });
  document.getElementById('listeParcours').innerHTML= listeParcours;

  listeLangues = `<h4>Langues</h4>`;
  infosCV.langues.forEach((langue) => {
    if(langue.niveauLangue === "Débutant") prc="20%";
    if(langue.niveauLangue === "Intermédiaire") prc="40%";
    if(langue.niveauLangue === "Indépendant") prc="60%";
    if(langue.niveauLangue === "Avancé") prc="80%";
    if(langue.niveauLangue === "Courant") prc="100%";
    listeLangues += `<span class="fs-6">${langue.langue}</span>
                      <div class="bar mb-2">
                          <div class="bare bar-fill" style="width: ${prc};"></div>
                      </div>`
  });
  document.getElementById('listeLangues').innerHTML= listeLangues;

  listeExperiences = `<h3 class="fw-semibold text-fill">Expériences</h3>`;
  infosCV.experiences.forEach((experience) => {
    listeExperiences += `<p class="fs-6"><span class="fw-semibold">${experience.debut}-${experience.fin}</span> <br><span class="fw-bold text-fill">${experience.poste}</span> -
                          <span class="fw-medium">${experience.entreprise}</span><br> 
                          <span class="text-body-secondary">${experience.description}</span>
                        </p>`
  });
  document.getElementById('listeExperiences').innerHTML= listeExperiences;

  listeCompetences = `<h4 class="fw-semibold text-fill">Compétences</h4>`;
  infosCV.competences.forEach((competence) => {
    if(competence.niveauCompetence === "Débutant") prc="20%";
    if(competence.niveauCompetence === "Intermédiaire") prc="40%";
    if(competence.niveauCompetence === "Compétent") prc="60%";
    if(competence.niveauCompetence === "Confirmé") prc="80%";
    if(competence.niveauCompetence === "Expert") prc="100%";
    listeCompetences += `<span class="fs-5">${competence.competence}</span>
                        <div class="bar" style ="width : %">
                            <div class="bare bar-fill" style="width: ${prc};"></div>
                        </div>`
  });
  document.getElementById('listeCompetences').innerHTML= listeCompetences;


  listeInterets = ``;
  infosCV.interets.forEach((interet) => {
    listeInterets += `<li class="list-inline-item btn bar-fill text-white fw-semibold fs-6  p-1 rounded" >${interet.interet}</li>`
  });
  document.getElementById('listeInterets').innerHTML= listeInterets;

  document.querySelectorAll('.bar-fill').forEach(element => {
      element.style.backgroundColor = lightenRGB(infosCV.couleur,100);
  });
  document.querySelectorAll('.bartext-fill').forEach(element => {
      element.style.color = lightenRGB(infosCV.couleur,100);
    });
  document.querySelectorAll('.text-fill').forEach(element => {
    element.style.color = infosCV.couleur;
  });
  document.querySelector('.left-col').style.backgroundColor = infosCV.couleur;

  document.querySelectorAll(".cv *").forEach(element => {
    element.style.fontFamily = infosCV.police;
  });
}


function modifiernomCV(infosCV){
  nomCV.innerHTML=`
  <span class="input-group">
    <input type="text" class="form-control" id="nomCVe" value="${infosCV.nomCV}">
    <span class="input-group-text" onclick='enregistrernomCV(infosCV)'>Enregistrer</span>
  </span>
  `
}
function enregistrernomCV(infosCV){
  infosCV.nomCV = document.getElementById("nomCVe").value;
  nomCV.innerHTML=`<span id="nomcv" onclick="modifiernomCV(infosCV)">${infosCV.nomCV}</span> <i class="bi bi-pencil-square fs-6" onclick="modifiernomCV(infosCV)"></i>`;
  sauvegarderinfos(infosCV);

}


function changerPhoto(infosCV){
  document.getElementById('photo').innerHTML = `
    <div class="container input-group mb-3">
      <input type="file" class="form-control" id="imageInput" accept="image/*">
    </div>
    <div class="container btn-group " role="group" style="width : 80%">
      <button type="button" class="btn" onclick='annulerPhoto()'>Annuler</button>
      <button type="button" class="btn text-white rounded-4 bg-rose" onclick='annulerPhoto()'>Enregistrer</button>
    </div>`
    document.getElementById("imageInput").addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            infosCV.photo = e.target.result;
            document.getElementById("photoCV").src = infosCV.photo;
            sauvegarderinfos(infosCV);
        };
        reader.readAsDataURL(file);

    }
});

}
function annulerPhoto(){
  document.getElementById('photo').innerHTML = `
    <span class="fw-semibold d-flex align-items-center fs-6" onclick="changerPhoto(infosCV)">
      <i class="fa-solid fa-camera fs-2 me-2"></i> Ajouter une photo de profil
    </span>`
}


function ajouterInfos(infosCV){
  infos.innerHTML = `
  <div class="container-fluid w-60 d-flex flex-column align-items-center fs-5 text-body-secondary">
    <div class="container input-group mb-2">
      <input type="text" class="form-control" id="nom" placeholder="Nom" value="${infosCV.nom}">
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="bi bi-envelope-at"></i></span>
      <input type="email" class="form-control" id="email" placeholder="Email" value="${infosCV.email}">
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="bi bi-telephone"></i></span>
      <input type="text" class="form-control" id="numero" placeholder="Numero" value="${infosCV.numero}">
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
      <input type="text" class="form-control" id="adresse" placeholder="Adresse" value="${infosCV.adresse}">
    </div>
    <div class="container input-group mb-4">
      <span class="input-group-text"><i class="bi bi-briefcase"></i></span>
      <input type="text" class="form-control" id="metier" placeholder="Metier" value="${infosCV.metier}">
    </div>
    <div class="container btn-group " role="group" style="width : 80%">
      <button type="button" class="btn" onclick='annulerInfo(infosCV)'>Annuler</button>
      <button type="button" class="btn text-white rounded-4 bg-rose" onclick='enregistrerinfos(infosCV)'>Enregistrer</button>
    </div>
  </div>
  `;

};
function annulerInfo(infosCV){
  infos.innerHTML = `
  <div class="col-7 d-flex flex-column fs-5 text-body-secondary">
    <span class="pb-2 ps-4 fw-semibold" id="nom"> ${infosCV.nom}</span>
  </div>
  <div class="col-5 d-flex justify-content-center ">
      <button class="btn bg-rose text-white fs-6 fw-semibold rounded-pill" onclick="ajouterInfos(infosCV)" id="button">Modifier mes infos</button>
  </div>
  <div class="d-flex flex-column mt-2 ms-4 fs-6 text-body-secondary">
    <span class="pb-2"><i class="bi bi-envelope-at"></i> <span id="email">${infosCV.email}</span></span>
    <span class="pb-2"><i class="bi bi-telephone"></i> <span id="numero">${infosCV.numero}</span></span>
    <span class="pb-2"><i class="bi bi-geo-alt"></i> <span id="adresse">${infosCV.adresse}</span></span>
    <span class=""><i class="bi bi-briefcase"></i> <span id="metier">${infosCV.metier}</span></span>
  </div>
  `;
}
function enregistrerinfos(infosCV){
  infosCV.nom = document.getElementById('nom').value;
  infosCV.email = document.getElementById('email').value;
  infosCV.numero = document.getElementById('numero').value;
  infosCV.adresse = document.getElementById('adresse').value;
  infosCV.metier = document.getElementById('metier').value;
  annulerInfo(infosCV);
  remplacerInfos(infosCV);
  sauvegarderinfos(infosCV);
  document.getElementById('button').textContent = "Modifier";

}


function redigerProfil(infosCV){
  Profil.innerHTML=`
  <div class="form-floating mb-3">
    <textarea class="form-control rounded-4" placeholder="Mon profil" id="profilText" style="height: 20vh">${infosCV.profil}</textarea>
    <label for="profil" class="text-body-secondary">Mon profil</label>
  </div>
  <div class="container btn-group " role="group" style="width : 80%">
    <button type="button" class="btn" onclick='annulerProfil()'>Annuler</button>
    <button type="button" class="btn text-white rounded-4 bg-rose" onclick='enregistrerProfil(infosCV)'>Enregistrer</button>
  </div>
  `
}
function annulerProfil(){
  Profil.innerHTML=`
  <span class="fw-semibold d-flex align-items-center fs-6" onclick="redigerProfil(infosCV)"><i class="bi bi-person-fill me-2 fs-1"></i> Rediger mon profil</span>
  `
}
function enregistrerProfil(infosCV){ 
  infosCV.profil = document.getElementById('profilText').value;
  annulerProfil();
  remplacerInfos(infosCV);
  sauvegarderinfos(infosCV);

}


function ajouterParcours(infosCV){
  ajoutParcours.innerHTML= `
  <div class="container-fluid  bg-transparent btn border-dashed m-0 mt-3  px-4 py-3 rounded-5 shadow-sm"  onclick="ajouterParcours()">
    <span class="fw-semibold d-flex align-items-center fs-6"><i class="bi bi-plus-lg fs-2 pe-2"></i> Ajouter une etape sur le parcours scolaire</span>
  </div> 
  <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-4 py-4 rounded-5 shadow-sm">
    <div class="container input-group mb-2">
      <span class="input-group-text ">Date de debut</span>
      <input type="text" class="form-control" id="debut" placeholder="Ex: 2021">
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text ">Date de fin</span>
      <input type="text" class="form-control" id="fin" placeholder="Ex: 2024">
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="fa-solid fa-graduation-cap"></i></i></span>
      <input type="text" class="form-control" id="diplome" placeholder="Diplome">
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="fa-solid fa-school"></i></span>
      <input type="text" class="form-control" id="etablissement" placeholder="Etablissement">
    </div>
    <div class="container btn-group mt-3" role="group" style="width : 80%">
      <button type="button" class="btn" onclick='annulerParcours()'>Annuler</button>
      <button type="button" class="btn text-white rounded-4 bg-rose" onclick='enregistrerParcours(infosCV)'; 
'>Enregistrer</button>
    </div>
  </div> 
  `;
} 
function annulerParcours(){
  ajoutParcours.innerHTML = `
  <div class="container-fluid  bg-transparent btn border-dashed m-0 mt-3  px-4 py-3 rounded-5 shadow-sm"  onclick="ajouterParcours()">
    <span class="fw-semibold d-flex align-items-center fs-6"><i class="bi bi-plus-lg fs-2 pe-2"></i> Ajouter une etape sur le parcours scolaire</span>
  </div> 
  `
}
function enregistrerParcours(infosCV){
  index = (infosCV.parcours).length;
  infosCV.parcours[index]={};
  infosCV.parcours[index].debut = document.getElementById('debut').value;
  infosCV.parcours[index].fin = document.getElementById('fin').value;
  infosCV.parcours[index].diplome = document.getElementById('diplome').value;
  infosCV.parcours[index].etablissement = document.getElementById('etablissement').value;
  infosCV.parcours[index].id = infosCV.cParcours;
  infosCV.cParcours++;
  annulerParcours();
  updateParcours(infosCV);  
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);
}
function updateParcours(infosCV){
parcours = infosCV.parcours
parcoursHTML=``
parcours.forEach(function(parcour,index) {
  parcoursHTML += `
  <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-0 pb-2 pt-4 rounded-5 shadow-sm" id = ${parcour.id}>
    <div class="container input-group mb-2 px-4">
      <span class="input-group-text ">Date de debut</span>
      <input type="text" class="form-control" value="${parcour.debut}" readonly>
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text ">Date de fin</span>
      <input type="text" class="form-control" value="${parcour.fin}" readonly>
    </div>
    <div class="container input-group mb-2 px-4">
      <span class="input-group-text"><i class="bi bi-book"></i></span>
      <input type="text" class="form-control" value="${parcour.diplome}" readonly>
    </div>
    <div class="container input-group mb-2 px-4">
      <span class="input-group-text"><i class="bi bi-building"></i></span>
      <input type="text" class="form-control" value="${parcour.etablissement}" readonly>
    </div>
    <div class="container d-flex justify-content-end rounded-top-5 px-4">
      <button type="button" class="btn" onclick='modifierParcours(infosCV,${parcour.id})'>Modifier</button>
      <button type="button" class="btn btn-danger ms-2" onclick='supprimerParcours(infosCV,${parcour.id})'>Supprimer</button>
    </div>
  </div> 
  `
});
document.getElementById('parcours').innerHTML = parcoursHTML;
}
function supprimerParcours(infosCV,id){
  infosCV.parcours.forEach(function(parcour,index) {
    if(parcour.id === id){
      infosCV.parcours.splice(index,1);
    }
  });
  updateParcours(infosCV);
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}
function modifierParcours(infosCV,id){
  infosCV.parcours.forEach(function(parcour,index) {
    if(parcour.id === id){
      document.getElementById(id).innerHTML = `
        <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-0 pb-2 rounded-5 shadow-sm" id = ${parcour.id}>
          <div class="container input-group mb-2 px-4">
            <span class="input-group-text ">Date de debut</span>
            <input type="text" class="form-control" id='debut${id}' value="${parcour.debut}">
          </div>
          <div class="container input-group mb-2">
            <span class="input-group-text ">Date de fin</span>
            <input type="text" class="form-control" id='fin${id}' value="${parcour.fin}">
          </div>
          <div class="container input-group mb-2 px-4">
            <span class="input-group-text"><i class="fa-solid fa-graduation-cap"></i></i></span>
            <input type="text" class="form-control" id='diplome${id}' value="${parcour.diplome}">
          </div>
          <div class="container input-group mb-2 px-4">
            <span class="input-group-text"><i class="fa-solid fa-school"></i></span>
            <input type="text" class="form-control" id='etablissement${id}'  value="${parcour.etablissement}">
          </div>
          <div class="container d-flex justify-content-center mt-2 rounded-top-5">
            <button type="button" class="btn bg-rose text-white rounded-pill" onclick='modifieParcours(infosCV,${id})'>Enregistrer</button>
          </div>
        </div> 
      `
    }
  });
}
function modifieParcours(infosCV,id){
  infosCV.parcours.forEach(function(parcour,index) {
    if(parcour.id === id){
      parcour.debut = document.getElementById(`debut${id}`).value;
      parcour.fin = document.getElementById(`fin${id}`).value;
      parcour.diplome = document.getElementById(`diplome${id}`).value;
      parcour.etablissement = document.getElementById(`etablissement${id}`).value;
    }
  });
  updateParcours(infosCV);
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);
}


function ajouterLangues(infosCV){
  ajoutLangues.innerHTML= `
  <div class="container-fluid bg-transparent btn m-0 mt-3 border-dashed  px-4 py-3 rounded-5 shadow-sm" onclick="ajouterLangues()">
    <span class="fw-semibold d-flex align-items-center fs-6"><i class="bi bi-plus-lg fs-2 pe-2"></i> Ajouter une langue</span>
  </div>
  <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-4 py-4 rounded-5 shadow-sm">
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="fa-solid fa-language"></i></span>
      <input type="text" class="form-control" id="langue" placeholder="Langue">
      <select class="form-select fs-7 fs-md-6" id="niveauLangue" aria-label="Niveau linguistique">
      <option selected>Niveau Linguistique</option>
      <option value="Débutant">Débutant</option>
      <option value="Intermédiaire">Intermédiaire</option>
      <option value="Indépendant">Indépendant</option>
      <option value="Avancé">Avancé</option>
      <option value="Courant">Courant</option>
    </select>
    </div>
    <div class="container btn-group mt-3" role="group" style="width : 80%">
      <button type="button" class="btn" onclick='annulerLangues()'>Annuler</button>
      <button type="button" class="btn text-white rounded-4 bg-rose" onclick='enregistrerLangues(infosCV)'; 
'>Enregistrer</button>
    </div>
  </div> 
  `;
} 
function annulerLangues(){
  ajoutLangues.innerHTML = `
  <div class="container-fluid bg-transparent btn m-0 mt-3 border-dashed  px-4 py-3 rounded-5 shadow-sm" onclick="ajouterLangues()">
    <span class="fw-semibold d-flex align-items-center fs-6"><i class="bi bi-plus-lg fs-2 pe-2"></i> Ajouter une langue</span>
  </div>
  `
}
function enregistrerLangues(infosCV){
  index = (infosCV.langues).length;
  infosCV.langues[index]={};
  infosCV.langues[index].langue = document.getElementById('langue').value;
  infosCV.langues[index].niveauLangue = document.getElementById('niveauLangue').value;
  infosCV.langues[index].id = infosCV.cLangues;
  infosCV.cLangues++;
  annulerLangues();
  updateLangues(infosCV);  
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);


}
function updateLangues(infosCV){
langues = infosCV.langues
languesHTML=``
langues.forEach(function(langue,index) {
  languesHTML += `
  <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-4 py-4 rounded-5" id = ${langue.id}>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="fa-solid fa-language"></i></span>
      <input type="text" class="form-control" value="${langue.langue}" readonly>
      <input type="text" class="form-control" value="${langue.niveauLangue}" readonly>
    </div>
    <div class="container d-flex justify-content-end rounded-top-5 px-4">
      <button type="button" class="btn" onclick='modifierLangues(infosCV,${langue.id})'>Modifier</button>
      <button type="button" class="btn btn-danger ms-2" onclick='supprimerLangues(infosCV,${langue.id})'>Supprimer</button>
    </div>
  </div> 
  `
});
document.getElementById('langues').innerHTML = languesHTML;
}
function supprimerLangues(infosCV,id){
  infosCV.langues.forEach(function(langue,index) {
    if(langue.id === id){
      infosCV.langues.splice(index,1);
    }
  });
  updateLangues(infosCV);
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}
function modifierLangues(infosCV,id){
  infosCV.langues.forEach(function(langue,index) {
    if(langue.id === id){
      document.getElementById(id).innerHTML = `
        <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-0 rounded-5" id = ${langue.id}>
          <div class="container input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-language"></i></span>
            <input type="text" class="form-control" id="langue${id}" value="${langue.langue}">
            <select class="form-select fs-7 fs-md-6" id="niveauLangue${id}" aria-label="Niveau linguistique" value="${langue.niveauLangue}">
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Indépendant">Indépendant</option>
              <option value="Avancé">Avancé</option>
              <option value="Courant">Courant</option>
            </select>
          </div>
          <div class="container d-flex justify-content-center rounded-top-5">
            <button type="button" class="btn bg-rose text-white rounded-pill" onclick='modifieLangues(infosCV,${langue.id})'>Enregistrer</button>
          </div>
        </div> 
      `
    }
  });
}
function modifieLangues(infosCV,id){
  infosCV.langues.forEach(function(langue,index) {
    if(langue.id === id){
      langue.langue = document.getElementById(`langue${id}`).value;
      langue.niveauLangue = document.getElementById(`niveauLangue${id}`).value;
    }
  });
  updateLangues(infosCV);
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}


function ajouterExperiences(infosCV){
  ajoutExperiences.innerHTML= `
  <div class="container-fluid bg-transparent m-0 btn mt-3 border-dashed px-4 py-3 rounded-5 shadow-sm" onclick="ajouterExperiences()">
    <span class="fw-semibold d-flex align-items-center fs-6"><i class="bi bi-plus-lg fs-2 pe-2"></i> Ajouter une experience professionnelle</span>
  </div> 
  <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-4 py-4 rounded-5 shadow-sm">
    <div class="container input-group mb-2">
      <span class="input-group-text ">Date de debut</span>
      <input type="text" class="form-control" id="debutExp" placeholder="Ex: 2021">
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text ">Date de fin</span>
      <input type="text" class="form-control" id="finExp" placeholder="Ex: 2024">
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="fa-solid fa-user-tie"></i></span>
      <input type="text" class="form-control" id="poste" placeholder="Poste occupé">
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="bi bi-building"></i></span>
      <input type="text" class="form-control" id="entreprise" placeholder="Entreprise">
    </div>
    <div class="container-fluid form-floating mb-2">
      <textarea class="form-control rounded-4" placeholder="Description du poste" id="experienceText" style="height: 15vh"></textarea>
      <label for="experienceText" class="text-body-secondary">Description du poste</label>
    </div>
    <div class="container btn-group mt-3" role="group" style="width : 80%">
      <button type="button" class="btn" onclick='annulerExperiences()'>Annuler</button>
      <button type="button" class="btn text-white rounded-4 bg-rose" onclick='enregistrerExperiences(infosCV)'>Enregistrer</button>
    </div>
  </div> 
  `;
} 
function annulerExperiences(){
  ajoutExperiences.innerHTML = `
  <div class="container-fluid bg-transparent m-0 btn mt-3 border-dashed px-4 py-3 rounded-5 shadow-sm" onclick="ajouterExperiences()">
    <span class="fw-semibold d-flex align-items-center fs-6"><i class="bi bi-plus-lg fs-2 pe-2"></i> Ajouter une experience professionnelle</span>
  </div>
  `
}
function enregistrerExperiences(infosCV){
  index = (infosCV.experiences).length;
  infosCV.experiences[index]={};
  infosCV.experiences[index].debut = document.getElementById('debutExp').value;
  infosCV.experiences[index].fin = document.getElementById('finExp').value;
  infosCV.experiences[index].poste = document.getElementById('poste').value;
  infosCV.experiences[index].entreprise = document.getElementById('entreprise').value;
  infosCV.experiences[index].description = document.getElementById('experienceText').value;
  infosCV.experiences[index].id = infosCV.cExperiences;
  infosCV.cExperiences++;
  annulerExperiences();
  updateExperiences(infosCV);  
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}
function updateExperiences(infosCV){
experiences = infosCV.experiences
experiencesHTML=``
experiences.forEach(function(experience,index) {
  experiencesHTML += `
  <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-4 py-4 rounded-5 shadow-sm" id=${experience.id}>
    <div class="container input-group mb-2">
      <span class="input-group-text ">Date de debut</span>
      <input type="text" class="form-control" value="${experience.debut}" readonly>
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text ">Date de fin</span>
      <input type="text" class="form-control" value="${experience.fin}" readonly>
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="fa-solid fa-user-tie"></i></span>  
      <input type="text" class="form-control" value="${experience.poste}" readonly>
    </div>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="bi bi-building"></i></span>
      <input type="text" class="form-control" value="${experience.entreprise}" readonly>
    </div>
    <div class="container-fluid form-floating mb-2">
      <textarea class="form-control rounded-4" placeholder="Description du poste" id="experienceText" style="height: 15vh" readonly>${experience.description}</textarea>
      <label for="experienceText" class="text-body-secondary">Description du poste</label>
    </div>
    <div class="container d-flex justify-content-end px-4">
      <button type="button" class="btn" onclick='modifierExperiences(infosCV,${experience.id})'>Modifier</button>
      <button type="button" class="btn btn-danger ms-2" onclick='supprimerExperiences(infosCV,${experience.id})'>Supprimer</button>
    </div>
  </div> 
  `
});
document.getElementById('experiences').innerHTML = experiencesHTML;
}
function supprimerExperiences(infosCV,id){
  infosCV.experiences.forEach(function(experience,index) {
    if(experience.id === id){
      infosCV.experiences.splice(index,1);
    }
  });
  updateExperiences(infosCV);
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}
function modifierExperiences(infosCV,id){
  infosCV.experiences.forEach(function(experience,index) {
    if(experience.id === id){
      document.getElementById(id).innerHTML = `
        <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 rounded-5" id=${experience.id}>
          <div class="container input-group mb-2">
            <span class="input-group-text ">Date de debut</span>
            <input type="text" class="form-control" id="debutExp${experience.id}" value="${experience.debut}">
          </div>
          <div class="container input-group mb-2">
            <span class="input-group-text ">Date de fin</span>
            <input type="text" class="form-control" id="finExp${experience.id}" value="${experience.fin}">
          </div>
          <div class="container input-group mb-2">
            <span class="input-group-text"><i class="fa-solid fa-user-tie"></i></span>
            <input type="text" class="form-control" id="poste${experience.id}" value="${experience.poste}">
          </div>
          <div class="container input-group mb-2">
            <span class="input-group-text"><i class="bi bi-building"></i></span>
            <input type="text" class="form-control" id="entreprise${experience.id}" value="${experience.entreprise}">
          </div>
          <div class="container-fluid form-floating mb-2">
            <textarea class="form-control rounded-4" placeholder="Description du poste" id="experienceText${experience.id}" style="height: 15vh"></textarea>
            <label for="experienceText" class="text-body-secondary">Description du poste</label>
          </div>
          <div class="container d-flex justify-content-center mt-2 rounded-top-5">
            <button type="button" class="btn bg-rose text-white rounded-pill" onclick='modifieExperiences(infosCV,${id})'>Enregistrer</button>
          </div>
        </div> 
      `
    }
  });
}
function modifieExperiences(infosCV,id){
  infosCV.experiences.forEach(function(experience,index) {
    if(experience.id === id){
      experience.debut = document.getElementById(`debutExp${id}`).value;
      experience.fin = document.getElementById(`finExp${id}`).value;
      experience.diplome = document.getElementById(`poste${id}`).value;
      experience.entreprise = document.getElementById(`entreprise${id}`).value;
      experience.description = document.getElementById(`experienceText${id}`).value;
    }
  });
  updateExperiences(infosCV);
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}
  
  
function ajouterCompetences(infosCV){
  ajoutCompetences.innerHTML= `
  <div class="container-fluid bg-transparent m-0 btn mt-3 border-dashed  px-4 py-3 rounded-5 shadow-sm" onclick="ajouterCompetences()">
    <span class="fw-semibold d-flex align-items-center fs-6"><i class="bi bi-plus-lg fs-2 pe-2"></i> Ajouter une competence</span>
  </div>
  <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-4 py-4 rounded-5 shadow-sm">
    <div class="container input-group mb-2">
      <span class="input-group-text "><i class="fa-solid fa-brain"></i></span>
      <input type="text" class="form-control" id="competence" placeholder="Competence">
    </div>
    <div class="container input-group mb-2">
      <select class="form-select" id="niveauCompetence" aria-label="Niveau de competence">
        <option  selected>Niveau de competence</option>
        <option value="Débutant">Débutant</option>
        <option value="Intermédiaire">Intermédiaire</option>
        <option value="Compétent">Compétent</option>
        <option value="Confirmé">Confirmé</option>
        <option value="Expert">Expert</option>
      </select>
    </div>
    <div class="container btn-group mt-3" role="group" style="width : 80%">
      <button type="button" class="btn" onclick='annulerCompetences()'>Annuler</button>
      <button type="button" class="btn text-white rounded-4 bg-rose" onclick='enregistrerCompetences(infosCV)'>Enregistrer</button>
    </div>
  </div> 
  `;
} 
function annulerCompetences(){
  ajoutCompetences.innerHTML = `
  <div class="container-fluid bg-transparent m-0 btn mt-3 border-dashed  px-4 py-3 rounded-5 shadow-sm" onclick="ajouterCompetences()">
    <span class="fw-semibold d-flex align-items-center fs-6"><i class="bi bi-plus-lg fs-2 pe-2"></i> Ajouter une competence</span>
  </div>
  `
}
function enregistrerCompetences(infosCV){
  index = (infosCV.competences).length;
  infosCV.competences[index]={};
  infosCV.competences[index].competence= document.getElementById('competence').value;
  infosCV.competences[index].niveauCompetence = document.getElementById('niveauCompetence').value;
  infosCV.competences[index].id = infosCV.cCompetences;
  infosCV.cCompetences++;
  annulerCompetences();
  updateCompetences(infosCV);  
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}
function updateCompetences(infosCV){
Competences = infosCV.competences
CompetencesHTML=``
Competences.forEach(function(competence,index) {
  CompetencesHTML += `
  <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-4 py-4 rounded-5" id = ${competence.id}>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="fa-solid fa-brain"></i></span>
      <input type="text" class="form-control" value="${competence.competence}" readonly>
      <input type="text" class="form-control" value="${competence.niveauCompetence}" readonly>
    </div>
    <div class="container d-flex justify-content-end rounded-top-5 px-4">
      <button type="button" class="btn" onclick='modifierCompetences(infosCV,${competence.id})'>Modifier</button>
      <button type="button" class="btn btn-danger ms-2" onclick='supprimerCompetences(infosCV,${competence.id})'>Supprimer</button>
    </div>
  </div> 
  `
});
document.getElementById('competences').innerHTML = CompetencesHTML;
}
function supprimerCompetences(infosCV,id){
  infosCV.competences.forEach(function(competence,index) {
    if(competence.id === id){
      infosCV.competences.splice(index,1);
    }
  });
  updateCompetences(infosCV);
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}
function modifierCompetences(infosCV,id){
  infosCV.competences.forEach(function(competence,index) {
    if(competence.id === id){
      document.getElementById(id).innerHTML = `
        <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-0 rounded-5" id = ${competence.id}>
          <div class="container input-group mb-3">
            <span class="input-group-text "><i class="fa-solid fa-brain"></i></span>
            <input type="text" class="form-control" id="competence${id}" value="${competence.competence}">
          </div>
          <div class="container input-group mb-2">
            <select class="form-select" id="niveauCompetence${id}" aria-label="Niveau de competence" value="${competence.niveauCompetence}">
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Compétent">Compétent</option>
              <option value="Confirmé">Confirmé</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div class="container d-flex justify-content-center rounded-top-5">
            <button type="button" class="btn bg-rose text-white rounded-pill" onclick='modifieCompetences(infosCV,${competence.id})'>Enregistrer</button>
          </div>
        </div> 
      `
    }
  });
}
function modifieCompetences(infosCV,id){
  infosCV.competences.forEach(function(competence,index) {
    if(competence.id === id){
      competence.competence = document.getElementById(`competence${id}`).value;
      competence.niveauCompetence = document.getElementById(`niveauCompetence${id}`).value;
    }
  });
  updateCompetences(infosCV);
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}
  
  
function ajouterInterets(infosCV){
  ajoutInterets.innerHTML= `
  <div class="container-fluid bg-transparent m-0 btn mt-3 border-dashed px-4 py-3 rounded-5 shadow-sm" onclick="ajouterInterets()">
    <span class="fw-semibold d-flex align-items-center fs-6"><i class="bi bi-plus-lg fs-2 pe-2"></i> Ajouter un centre d’interet</span>
  </div>
  <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-4 py-4 rounded-5 shadow-sm">
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="fa-solid fa-heart"></i></span>
      <input type="text" class="form-control" id="interet" placeholder="Donnez un centre d'interet">
    </div>
    <div class="container btn-group mt-3" role="group" style="width : 80%">
      <button type="button" class="btn" onclick='annulerInterets()'>Annuler</button>
      <button type="button" class="btn text-white rounded-4 bg-rose" onclick='enregistrerInterets(infosCV)'>Enregistrer</button>
    </div>
  </div> 
  `;
} 
function annulerInterets(){
  ajoutInterets.innerHTML = `
  <div class="container-fluid bg-transparent m-0 btn mt-3 border-dashed px-4 py-3 rounded-5 shadow-sm" onclick="ajouterInterets()">
    <span class="fw-semibold d-flex align-items-center fs-6"><i class="bi bi-plus-lg fs-2 pe-2"></i> Ajouter un centre d’interet</span>
  </div>
  `
}
function enregistrerInterets(infosCV){
  index = (infosCV.interets).length;
  infosCV.interets[index]={};
  infosCV.interets[index].interet = document.getElementById('interet').value;
  infosCV.interets[index].id = infosCV.cInterets;
  infosCV.cInterets++;
  annulerInterets();
  updateInterets(infosCV);  
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);


}
function updateInterets(infosCV){
Interets = infosCV.interets
InteretsHTML=``
Interets.forEach(function(interet,index) {
  InteretsHTML += `
  <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-4 py-4 rounded-5" id = ${interet.id}>
    <div class="container input-group mb-2">
      <span class="input-group-text"><i class="fa-solid fa-heart"></i></span>
      <input type="text" class="form-control" value="${interet.interet}" readonly>
    </div>
    <div class="container d-flex justify-content-end rounded-top-5 px-4">
      <button type="button" class="btn" onclick='modifierInterets(infosCV,${interet.id})'>Modifier</button>
      <button type="button" class="btn btn-danger ms-2" onclick='supprimerInterets(infosCV,${interet.id})'>Supprimer</button>
    </div>
  </div> 
  `
});
document.getElementById('interets').innerHTML = InteretsHTML;
}
function supprimerInterets(infosCV,id){
  infosCV.interets.forEach(function(interet,index) {
    if(interet.id === id){
      infosCV.interets.splice(index,1);
    }
  });
  updateInterets(infosCV);
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}
function modifierInterets(infosCV,id){
  infosCV.interets.forEach(function(interet,index) {
    if(interet.id === id){
      document.getElementById(id).innerHTML = `
        <div class="container-fluid d-flex flex-column align-items-center bg-white m-0 mt-3 px-0 rounded-5" id = ${interet.id}>
          <div class="container input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-heart"></i></span>
            <input type="text" class="form-control" id="interet${id}" value="${interet.interet}">
          </div>
          <div class="container d-flex justify-content-center rounded-top-5">
            <button type="button" class="btn bg-rose text-white rounded-pill" onclick='modifieInterets(infosCV,${interet.id})'>Enregistrer</button>
          </div>
        </div> 
      `
    }
  });
}
function modifieInterets(infosCV,id){
  infosCV.interets.forEach(function(interet,index) {
    if(interet.id === id){
      interet.interet = document.getElementById(`interet${id}`).value;
    }
  });
  updateInterets(infosCV);
  sauvegarderinfos(infosCV);
  remplacerInfos(infosCV);

}


function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join(""); // Format court
  let num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
function lightenRGB(hex, factor) {
  let rgb = hexToRgb(hex);
  let newR = Math.min(255, rgb.r + factor);
  let newG = Math.min(255, rgb.g + factor);
  let newB = Math.min(255, rgb.b + factor);
  return rgbToHex(newR, newG, newB);
}
if(window.location.pathname === "/personnaliser.html" || window.location.pathname === "/SEN-CV/personnaliser.html"){
  document.getElementById("colorInput").addEventListener("input", function(event) {
    document.querySelectorAll('.bar-fill').forEach(element => {
      element.style.backgroundColor = lightenRGB(event.target.value,100);
    });
    document.querySelectorAll('.text-fill').forEach(element => {
      element.style.color = event.target.value;
    });
    document.querySelectorAll('.bartext-fill').forEach(element => {
      element.style.color = lightenRGB(event.target.value,100);
    });
    document.querySelector('.left-col').style.backgroundColor = event.target.value;
    
  });
  document.getElementById("colorInput").addEventListener("change", function(event) {
    infosCV.couleur = event.target.value;
    sauvegarderinfos(infosCV);
  });
  function changerPolice(police,infosCV) {
    document.querySelectorAll(".cv *").forEach(element => {
      element.style.fontFamily = police;
    });
    infosCV.police = police;
    sauvegarderinfos(infosCV);
  }
}
function downloadPDF(infosCV) {
    document.querySelector(".cv").classList.remove('big');
    const element = document.querySelector(".cv");
    html2pdf(element, {
        margin: 0,
        padding: 0,
        filename: 'CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
    })
    setTimeout(function() {
        document.querySelector(".cv").classList.add('big');
    }, 10);
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

