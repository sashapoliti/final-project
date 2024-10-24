public with sharing class StoricoClass {
    
    @AuraEnabled
    public static List<User> getDipendenti() {
        return [SELECT Id, Name, Profile.Name FROM User WHERE Profile.Name = 'Dipendente'];
    }
}