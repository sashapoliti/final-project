import { api, LightningElement } from 'lwc';
import getValutazioni from '@salesforce/apex/StoricoClass.getValutazioni';

export default class PaginaDipendente extends LightningElement {

    _dipendente;
    valutazioniOriginali = [];

    @api
    set dipendente(value) {
        this._dipendente = value;
        this.AllValutazioni(this._dipendente.Id);
    }

    get dipendente() {
        return this._dipendente;
    }

    valutazioni = [];
    anni = [];

    async AllValutazioni(dipendenteId) {
        try {
            this.valutazioni = await getValutazioni({
                dipendenteId
            });

            // Ordina le valutazioni dal più recente al meno recente
            this.valutazioni.sort((a, b) => {
                let annoA = new Date(a.Data__c).getFullYear();
                let annoB = new Date(b.Data__c).getFullYear();
                return annoB - annoA;
            });

            this.valutazioniOriginali = [...this.valutazioni]; /* copia delle valutazioni */
            this.getAnni(this.valutazioni);
        } catch (error) {
            console.log(error);
        }
    }

    getAnni(valutazioni) {
        this.anni = [];
        valutazioni.forEach(e => {
            let annoValutazione = new Date(e.Data__c).getFullYear();
            e.Data__c = annoValutazione;
            if (!this.anni.includes(annoValutazione)) {
                this.anni.push(annoValutazione);
            }
        });

        console.log('anni', this.anni);
    }

    /* Metodo per gestire il cambio di anno */
    cambioAnno(event) {
        const annoSelezionato = event.target.value;

        if (annoSelezionato === '') {
            /* Ripristina le valutazioni */
            this.valutazioni = [...this.valutazioniOriginali];
        } else {
            /* Filtra le valutazioni per anno */
            this.valutazioni = this.valutazioniOriginali.filter(v => v.Data__c == annoSelezionato);
        }

        /* console.log('valutazioni filtrate', this.valutazioni); */
    }
}