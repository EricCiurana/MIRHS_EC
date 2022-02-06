/// SPDX-License-Identifier: TODEFINE

pragma solidity >=0.7.0 <0.9.0;

contract MIRLauncher {
    address[] public MIRList;

    function newMIR(string memory version) public {
        MIR_Hospital_Selection newMIR_Hospital_Selection = new MIR_Hospital_Selection(msg.sender, version );
        MIRList.push(address(newMIR_Hospital_Selection));
    }

    function getMIRList() public view returns (address[] memory) {
        return MIRList;
    }
}

contract MIR_Hospital_Selection {
    struct Service {
        string department;
        uint256 ammount;
    }
    struct Hospital { 
        string unique;
        string name;
        uint numServices;
        mapping (uint256 => Service) servicesInHospital;
    }
    struct Examinee {
        address addr;
        uint unique;
        string name;
        string surnames;
        mapping (uint => uint) hospital2Service;
    }
    address public manager;     // Contract manager address
    string public version;      // Version
    bool public contractIsOpen;    

    uint public numHospitals;
    mapping (uint => Hospital) hospitals;

    uint public numExaminees;
    mapping (uint => Examinee) examinees;

    uint public numSelections; // num de votos
    
    /* Constructor foo */
    constructor(address creator, string memory _version) {
        //manager = msg.sender;   // The account who launched the contract becomes the contract manager
        manager = creator;
        version = _version;
        contractIsOpen = true;
        numHospitals = 0;
        numExaminees = 0;
        numSelections = 0;
    }


    /* Restrict foos that use this modifier so only the manager can call it */
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    modifier checkOpen() {
        require(contractIsOpen);
        _;
    }

    function getDetails() public view returns (uint, uint, uint, bool) {
        return ( numHospitals,
            numExaminees,
            numSelections,
            contractIsOpen
        );
    }

    function advancePosition() public restricted checkOpen {
        numSelections++;
    }
    
    function closeContract() public restricted{
        contractIsOpen = false;
    }
    function joinExaminee(string memory name, string memory surnames) public checkOpen returns (uint examineeID) {
        examineeID = numExaminees++;
        Examinee storage e = examinees[examineeID];
        e.addr = msg.sender;
        e.unique = examineeID;
        e.name = name;
        e.surnames = surnames;
        return examineeID;
    }
    function getExaminee(uint examineeID) public view virtual returns (string memory) {
        string memory name = examinees[examineeID].name;
        return name;
    }
    function newHospital(string memory externalID, string memory hospitalName) public restricted checkOpen returns (uint hospitalID) {
        hospitalID = numHospitals++;
        Hospital storage h = hospitals[hospitalID];
        h.unique = externalID;
        h.name = hospitalName;
        return hospitalID;
    }
    function getHospitalName(uint hospitalID) public view virtual returns (string memory) {
        string memory name = hospitals[hospitalID].name;
        return name;
    }
    function getHospitalService(uint hospitalID, uint serviceID) public view virtual returns (Service memory) {
        Hospital storage h = hospitals[hospitalID];
        Service memory s = h.servicesInHospital[serviceID];
        return s;
    }
    function newServiceInHopsital(uint hospitalID, string memory department, uint ammount) public restricted checkOpen returns (uint serviceID) {
        Hospital storage h = hospitals[hospitalID];
        serviceID = h.numServices++;
        Service storage s = h.servicesInHospital[serviceID];
        s.department = department;
        s.ammount = ammount;
    }
    function getServiceInHospital(uint hospitalID, uint serviceID) public view virtual returns (Service memory) {
        Hospital storage h = hospitals[hospitalID];
        Service memory serv = h.servicesInHospital[serviceID];
        return serv;
    }
    function takePosition(uint hospitalID, uint serviceID, uint examineePosition) public checkOpen returns (bool){
        require(examineePosition <= numSelections + 1);
        bool done = false;
        Hospital storage h = hospitals[hospitalID];
        Service storage s = h.servicesInHospital[serviceID];
        Examinee storage e = examinees[examineePosition];
        if(s.ammount > 0) {
            e.hospital2Service[hospitalID] = serviceID;
            s.ammount--;
            numSelections++;
            done = true;
        }
        return done;
    }
}