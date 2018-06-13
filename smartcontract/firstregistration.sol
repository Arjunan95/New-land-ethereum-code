 pragma solidity ^0.4.0;

 contract landRegistry {
     
      struct landdetails
    {
      string name;
      uint32 aadharno;
      uint32 phoneno;
      uint32 propertyId;
    }
      

 mapping(uint32 => landdetails) public landreg;
 
 function newlandreg(uint32 _propertyId,string _name, uint32 _aadharno, uint32 _phoneno) public  {
     
     landreg[_propertyId].name = _name;
     landreg[_propertyId].aadharno = _aadharno;
     landreg[_propertyId].phoneno = _phoneno;
  
 
 }
 
  function getMessageByIndex(uint32 _propertyId) constant returns (string, uint32,uint32)
    
    {
        
        return (landreg[_propertyId].name, landreg[_propertyId].aadharno,landreg[_propertyId].phoneno);
    }
 
 
}