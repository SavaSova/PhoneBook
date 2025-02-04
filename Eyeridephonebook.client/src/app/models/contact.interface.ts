export interface ContactInterface {
  //All
  id: number;
  contactType: string;
  name: string;
  phoneNumber: string;
  textComments: string;

  //Public 
  fieldOfActivity: string;
  tin: string;

  //Privat  
  industry: string;
  ein: string; 
}
