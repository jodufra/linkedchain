contract LinkedChain {

    address ownerAddress = 0x0A37dBF0E09a31d9786c02A5f570Ec5aDb11d832;
    
    struct Entity {
        string name;
        bool isCompany;
        string[] certifications;
    }
        
    mapping (address => Entity) entities;
    mapping (address => bool) public registedEntities;
    mapping (address => string[]) public certifications;
    
    function updateEntity(string _name) {
       entities[msg.sender] = Entity(_name, false, new string[](0));
       registedEntities[msg.sender] = true;
    }
    
    function getEntity() public constant returns (string name, bool isCompany, uint certificationsCounter) {
       name = entities[msg.sender].name;
       isCompany = entities[msg.sender].isCompany;
       certificationsCounter = entities[msg.sender].certifications.length;
    }

    function addCertification(string _certification) {
        entities[msg.sender].certifications.push(_certification);
        certifications[msg.sender] = entities[msg.sender].certifications;
    }
}