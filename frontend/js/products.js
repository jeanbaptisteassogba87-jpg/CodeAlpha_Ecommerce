import { API_URL } from "./config.js";
import { getToken } from "./auth.js";

async function loadProducts(){
    try {
        const token = getToken();
        const response = await fetch(`${API_URL}products/`,{
            headers : {
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.ok){
            const products = await response.json();
            return products ;
        }else{
            console.error('Erreur lors du chargement des profuits !');
            return [];
        }
    } catch (error) {
        console.error('Erreur réseau',error);
        return [];
    }
}

export {loadProducts} ;