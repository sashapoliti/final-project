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
    dipendente;

    clickDipendente(event) {
        this.showPaginaDipendente = true;

        /* prendo id del dipendente al click dal data id */
        this.dipendente = this.dipendentiList.find(d => d.Id === event.currentTarget.dataset.id);

        console.log(this.dipendente);
    }
}