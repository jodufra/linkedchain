pragma solidity 0.4.15;

contract LinkedChain {

  int8 constant START_POINTS = 10;

  enum EntityType { User, Company }

  struct Entity {
    string name;
    address entityAddress;
    EntityType entityType;
    int points;
  }

  struct Certification {
    string description;
    address from;
    address to;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  // owner of the contract
  address owner;

  // container of all entitites
  mapping (address => Entity) entities;

  // TODO: mapping (address => mapping (address => Entity)) unlockedEntities;

  // dictionary of all entitites
  mapping (address => bool) public isEntityRegistered;

  // dictionary of all Certification belonging to the key address Entity
  mapping (address => Certification[]) public certificationsOwned;

  // dictionary of all Certification given by the key address Entity
  mapping (address => Certification[]) public certificationsGiven;

  // event that is triggered when a entity is updated or created
  event EntityUpdated(address _address, string _name, bool _isCompany);

  /*
   * Constructor - sets the owner as the msg.sender that created the contract
   */
  function LinkedChain() public {
    owner = msg.sender;
  }

  function triggerEntityUpdated(address _entityAddress) private {
    var entity = entities[_entityAddress];
    EntityUpdated(entity.entityAddress,  entity.name, entity.entityType == EntityType.Company);
  }

  /*
   * If entity exist, then updates the Entity with the given name,
   * else, then creates a new Entity as a User linked to msg.sender and gives it START_POINTS points
   */
  function updateEntity(string _name) public {
    // name must not be empty
    bytes memory _nameBytes = bytes(_name);
    require(_nameBytes.length > 0);

    if (!isEntityRegistered[msg.sender]) {
      // create the entity and gives it 10 points
      entities[msg.sender] = Entity(_name, msg.sender, EntityType.User, START_POINTS);
      // and sets the entity as registered
      isEntityRegistered[msg.sender] = true;
    } else {
      // update the name the entity
      entities[msg.sender].name = _name;
    }

    // trigger the entity updated event
    triggerEntityUpdated(msg.sender);
  }

  /*
   * Returns the Entity information of msg.sender
   */
  function getEntity() public constant returns (string name, bool isCompany, uint certificationsOwnedCounter) {
    name = entities[msg.sender].name;
    isCompany = entities[msg.sender].entityType == EntityType.Company;
    certificationsOwnedCounter = certificationsOwned[msg.sender].length;
  }

  /*
   *
   */
  function addCertification(address _destinatary, string _certification) public {
    // checks if the sender can assign certificates
    // TODO: require(entities[msg.sender].entityType = EntityType.Company)

    // destinatary must have a valid address
    require(_destinatary != address(0));

    // certification must not be empty
    bytes memory _certificationBytes = bytes(_certification);
    require(_certificationBytes.length > 0);

    // create the certification
    var certification = Certification(_certification, msg.sender, _destinatary);

    // store the certification
    certificationsOwned[_destinatary].push(certification);
    certificationsGiven[msg.sender].push(certification);
  }

  /*
   *
   */
  function setEntityType(address _entityAddress, bool _isCompany) public onlyOwner {
    // destinatary must have a valid address
    require(_entityAddress != address(0));

    // update the type of entity
    entities[_entityAddress].entityType = _isCompany ? EntityType.Company : EntityType.User;

    // trigger the entity updated event
    triggerEntityUpdated(_entityAddress);
  }
}
