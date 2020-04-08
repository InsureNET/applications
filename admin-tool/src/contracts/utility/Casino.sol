pragma solidity ^0.5.16;

contract Casino {
    address payable public owner;
    uint256 public minimumBet;
    uint256 public totalBet;
    uint256 public numberOfBets;
    uint256 public maxAmountOfBets = 100;
    address payable[] public players;

    struct Player {
        //uint256 id;
        uint256 amountBet;
        uint256 numberSelected;
    }

    mapping(address => Player) public playerInfo;

    function () external payable {}

    constructor (uint256 _minimumBet) public {
        owner = msg.sender;
        if (_minimumBet != 0) {
            minimumBet = _minimumBet;
        }

    }

    function checkPlayerExists(
        address player
    ) public view returns (bool) {
        for(uint256 i = 0; i < players.length; i++) {
            if(players[i] == player) {
                return true;
            } else {
                return false;
            }
        }
    }

    function distributePrizes(uint256 numberWinner) public {
        address payable[100] memory winners;
        // count for array of winners
        uint256 count = 0;
        
        for(uint256 i = 0; i < players.length; i++) {
            address payable playerAddress = players[i];
            if(playerInfo[playerAddress].numberSelected == numberWinner) {
                winners[count] = playerAddress;
                count++;
            }
            // Delete all players after distribution
            delete playerInfo[playerAddress];
        }

        players.length = 0;

        // How much each winner gets
        uint256 winnerEtherAmount = totalBet / winners.length;
        for(uint256 j = 0; j < count; j++) {
            // make sure address is not empty
            if(winners[j] != address(0)) {
                winners[j].transfer(winnerEtherAmount);
            }
        }
    }

    function generateNumberWinner() public {
        uint256 numberGenerated = block.number % 10 + 1; // This isn't secure
        distributePrizes(numberGenerated);
    }

    // To bet for a number between 1 and 10 both inclusive
    function bet(uint256 numberSelected) public payable {
      require(!checkPlayerExists(msg.sender), 'Player does not exist');
      require(numberSelected >= 1 && numberSelected <= 10, 'Number selected is out of range');
      require(msg.value >= minimumBet, 'must meet minimum bet');
      playerInfo[msg.sender].amountBet = msg.value;
      playerInfo[msg.sender].numberSelected = numberSelected;
      numberOfBets++;
      players.push(msg.sender);
      totalBet += msg.value;

      if(numberOfBets >= maxAmountOfBets) {
          generateNumberWinner();
      }
    }

    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }
}