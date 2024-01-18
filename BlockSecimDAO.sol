// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract BlokSecimDAO {
    struct Proposal {
        string votingOwner;
        uint proposalIndex;
        uint optionsCount;
        uint op1Count;
        uint op2Count;
        uint op3Count;
        uint op4Count;
        uint op5Count;
        uint deadline;
        string description;
        string title;
        string[] optionsDescriptions;
        bool isActive;
    }

    Proposal[] public proposals;

    enum Vote {op1, op2, op3, op4, op5}
    
    uint proposalCount; 

    modifier activeProposal(uint _proposalIndex){
         if (block.timestamp >= proposals[_proposalIndex].deadline) {
        proposals[_proposalIndex].isActive = false;
    }
        require(block.timestamp < proposals[_proposalIndex].deadline);
        _;
    }

    function createProposal(string memory _description, string memory _votingOwner, string memory _title, string[] memory _optionsDescriptions) external {
        require(_optionsDescriptions.length>1,"yetersiz secenek");
        require(_optionsDescriptions.length<=5,"fazla secenek");
        
        proposals.push(Proposal({
            votingOwner: _votingOwner, 
            proposalIndex: proposals.length,
            optionsCount: _optionsDescriptions.length,
            op1Count: 0,
            op2Count: 0,
            op3Count: 0,
            op4Count: 0,
            op5Count: 0,
            title: _title,
            deadline: block.timestamp + 10 minutes,
            description: _description,
            optionsDescriptions: _optionsDescriptions,
            isActive: true
        }));

        proposalCount ++;
    }

    function voting(Vote vote, uint proposalIndex) external activeProposal(proposalIndex) {
        Proposal storage proposal = proposals[proposalIndex];
        
        if (vote == Vote.op1 && proposal.optionsCount >= 1) {
            proposal.op1Count +=1;
        }
        if (vote == Vote.op2 && proposal.optionsCount >= 2) {
            proposal.op2Count +=1;
        }
        if (vote == Vote.op3 && proposal.optionsCount >= 3) {
            proposal.op3Count +=1;
        }
        if (vote == Vote.op4 && proposal.optionsCount >= 4) {
            proposal.op4Count +=1;
        }
        if (vote == Vote.op5 && proposal.optionsCount >= 5) {
            proposal.op5Count +=1;
        }
    }

        function getOptionsDescriptions(uint proposalIndex) external view returns (string[] memory) {
        require(block.timestamp < proposals[proposalIndex].deadline, "Aktif degil");
        return proposals[proposalIndex].optionsDescriptions;
    }

        function getActiveProposals() external view returns (Proposal[] memory) {
        uint activeProposalCount = 0;

        
        for (uint i = 0; i < proposalCount; i++) {
            if (proposals[i].isActive && block.timestamp < proposals[i].deadline) {
                activeProposalCount++;
            }

        }

        
        Proposal[] memory activeProposals = new Proposal[](activeProposalCount);
        uint activeIndex = 0;

        
        for (uint i = 0; i < proposalCount; i++) {
            if (proposals[i].isActive && block.timestamp < proposals[i].deadline) {
                activeProposals[activeIndex] = proposals[i];
                activeIndex++;
            }
        }

        return activeProposals;
    }


        struct ProposalResult {
            string votingOwner;
            string title;
            string description;
            uint[] voteCounts;
            string[] optionsDescriptions;
    }

        function getAllProposalsResults() external view returns (ProposalResult[] memory) {
            ProposalResult[] memory results = new ProposalResult[](proposalCount);

            for (uint i = 0; i < proposalCount; i++) {
                Proposal storage proposal = proposals[i];
                uint[] memory voteCounts = new uint[](proposal.optionsCount);

                voteCounts[0] = proposal.op1Count;
                if (proposal.optionsCount > 1) voteCounts[1] = proposal.op2Count;
                if (proposal.optionsCount > 2) voteCounts[2] = proposal.op3Count;
                if (proposal.optionsCount > 3) voteCounts[3] = proposal.op4Count;
                if (proposal.optionsCount > 4) voteCounts[4] = proposal.op5Count;

                results[i] = ProposalResult({
                    votingOwner: proposal.votingOwner,
                    title: proposal.title,
                    voteCounts: voteCounts,
                    optionsDescriptions: proposal.optionsDescriptions,
                    description: proposal.description
                });
            }

            return results;
    }






}