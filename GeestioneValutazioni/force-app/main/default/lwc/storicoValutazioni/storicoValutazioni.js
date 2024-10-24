import { LightningElement } from 'lwc';
import getDipendenti from '@salesforce/apex/StoricoClass.getDipendenti';
import getCurrentUser from '@salesforce/apex/StoricoClass.getCurrentUser';

export default class StoricoValutazioni extends LightningElement {

    dipendentiList;

    /* metodo che si richiama al caricamento del componente */
    connectedCallback() {
        this.getCurrentUser();
    }

    /* controllo chi sia l'user corrente */
    async getCurrentUser() {
        try {
            const user = await getCurrentUser();
            if (user.Profile.Name === 'Dipendente') {
                /* se l'user corrente è un dipendente
                lo spedisco subito alla sua pagina utente,
                e lo blocco lì */
                this.dipendente = user;
                this.showPaginaDipendente = true;
                this.isUserDipendente = true;
            } else {
                this.get();
            }
        } catch (error) {
            console.log(error);
        }
    }

    /* ricerca dei contatti */
    async get() {
        try {
            this.dipendentiList = await getDipendenti();

            console.log(this.dipendentiList);
        } catch (error) {
            console.log(error);
        }
    }



    /* logica visualizzazione dipendente */
    showPaginaDipendente = false;
    dipendente;
    isUserDipendente= false;

    clickDipendente(event) {
        this.showPaginaDipendente = true;

        /* prendo id del dipendente al click dal data id */
        this.dipendente = this.dipendentiList.find(d => d.Id === event.currentTarget.dataset.id);

        console.log(this.dipendente);
    }

    /* metodo catturato dal figlio per ritornare indietro */
    returnIndietro() {
        this.showPaginaDipendente = false;
        this.dipendente = {};
    }
}