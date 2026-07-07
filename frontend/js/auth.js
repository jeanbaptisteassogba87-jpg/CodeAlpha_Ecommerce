import { API_URL } from "./config.js";


async function register(username, email, password) {
    try {
        const response = await fetch(`${API_URL}users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username, email, password }),
        });

        if (response.ok) {
            return "Compte créé avec succès";
        }

        const data = await response.json().catch(() => ({}));

        if (data.name) {
            return "Ce nom d'utilisateur est déjà utilisé";
        }
        if (data.email) {
            return "Cette adresse email est déjà utilisée";
        }
        if (data.password) {
            return "Le mot de passe est invalide";
        }

        return "Impossible de créer le compte";
    } catch (erreur) {
        return "Erreur de connexion au serveur";
    }
}

async function login(username,password){
    try {
        const response = await fetch(`${API_URL}token/`,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({username,password}),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token',data.access);
            return "Connexion réussie" ;
        }else{
            return "Identifiants incorrects"
        }

    } catch (erreur) {
        return "Erreur de connexion au serveur" ; 
    }
}

function logout(){
    localStorage.removeItem('token');
}


function isAuthenticated(){
    const token = localStorage.getItem('token');
    return token != null ;
}

function getToken(){
    const token = localStorage.getItem('token');
    return token ;
}

export {register, login , logout , isAuthenticated , getToken}
