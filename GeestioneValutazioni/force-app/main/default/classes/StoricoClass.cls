public with sharing class StoricoClass {
    
    @AuraEnabled
    public static List<User> getDipendenti() {
        return [SELECT Id, Name, Profile.Name FROM User WHERE Profile.Name = 'Dipendente'];
    }

    @AuraEnabled
    public static List<Valutazione__c> getValutazioni(Id dipendenteId) {
        System.debug('DipendenteId: ' + dipendenteId);
        return [SELECT Id, OwnerId, IsDeleted, Name,
        RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById,
        SystemModstamp, LastViewedDate, LastReferencedDate, Punteggio_Competenze_Tecniche__c,
        Punteggio_Obiettivi_Raggiunti__c, Descrizione_Obiettivi_Raggiunti__c, Commento_Competenze_Tecniche__c,
        Punteggio_Capacit_Comunicative__c, Commenti_Capacit_Comunicative__c, Punteggio_Collaborazione__c,
        Feedback_Globale__c, Commento_Collaborazione__c, Punteggio_Complessivo__c, Status__c,
        Visualizzato__c, Commento_del_Dipendente__c, Dipendente_Valutato__c, Data__c
        FROM Valutazione__c
        WHERE Dipendente_Valutato__c = :dipendenteId];
    }
}