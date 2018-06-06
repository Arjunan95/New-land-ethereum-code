pragma solidity ^0.4.0;

contract landRegistry {
     
      string name;
      uint32 aadharno;
      uint32 phoneno;

//  mapping(bytes32 => firstregistration) public firstregistrations;
 
 function newland( string _name, uint32 _aadharno, uint32 _phoneno) public  {

  name=_name;
  aadharno=_aadharno;
  phoneno=_phoneno;
 }
 
 function getfirstRegistrationDetails() public constant returns (string,uint32,uint32) {
     return (name,aadharno,phoneno);
     
}
 }