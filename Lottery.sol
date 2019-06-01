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
}
