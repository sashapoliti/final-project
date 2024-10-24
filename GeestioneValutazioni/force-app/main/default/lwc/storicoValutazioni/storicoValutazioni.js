import { LightningElement } from 'lwc';
import getDipendenti from '@salesforce/apex/StoricoClass.getDipendenti';

export default class StoricoValutazioni extends LightningElement {

    dipendentiList;

    /* metodo che si richiama al caricamento del componente */
    connectedCallback() {
        this.get();
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

    clickDipendente(event) {
        this.showPaginaDipendente = true;
    }
}