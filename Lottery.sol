pragma solidity ^0.4.18;

contract Lottery{
    address public manager;

    address[] public listOfPlayers;

    function Lottery() public{
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value > 0.01 ether);
        listOfPlayers.push(msg.sender);
    }

    function random() private view returns (uint){
        return uint(keccak256(block.difficulty, now, listOfPlayers));
    }

    function pickWinner() public{
        require(msg.sender == manager);  // only manager should be able to call pickWinner() function

        uint index = random() % listOfPlayers.length;
        listOfPlayers[index].transfer(this.balance); //0xabdsdbnsd
        listOfPlayers = new address[](0); // initial size of 0
    }
}
