//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NowOrLater is Ownable {
    using Counters for Counters.Counter;

    struct WorkListing {
        uint256 id;
        address walletAddrress;
        uint256 amount;
        bool isPartialPayment;
    }

    Counters.Counter private workListingIds;

    mapping(uint256 => WorkListing) public workListings;

    event Created_WorkListing(uint256 _id, address _walletAddress, uint256 _amount, bool _isPartialPayment);
    event Paid_Applicant(uint256 _id, address _applicantAddress, uint256 _amount, bool _isPartialPayment);

    function CreateWorkListing() external payable {
        workListings[workListingIds.current()] = WorkListing({
            id: workListingIds.current(),
            walletAddrress: msg.sender,
            amount: msg.value,
            isPartialPayment: false
        });

        uint256 currentId = workListingIds.current();

        workListingIds.increment();
        emit Created_WorkListing(workListings[currentId].id, workListings[currentId].walletAddrress, workListings[currentId].amount, workListings[currentId].isPartialPayment);
    } 

    function PayApplication(uint256 _workListingId, address _applicantAddress, uint256 _amount, bool _isPartialPayment) external OnlyCreator(_workListingId){
        require(_amount <= workListings[_workListingId].amount, "Amount > listing amount");
        if(_isPartialPayment) {
            workListings[_workListingId].amount = workListings[_workListingId].amount - _amount;
            workListings[_workListingId].isPartialPayment = true;
        } else {
            workListings[_workListingId].amount = 0;
            workListings[_workListingId].isPartialPayment = false;
        }

        (bool success, ) = payable(_applicantAddress).call{value: _amount}("");
        require(success, "Failed to pay applicant");
        emit Paid_Applicant(workListings[_workListingId].id, _applicantAddress, workListings[_workListingId].amount, workListings[_workListingId].isPartialPayment);
    }

    
    function getLastRewardId() public view returns (uint256) {
        return workListingIds.current();
    }

    function getWorkListingAmount(uint256 _workListingId) external view returns (uint256 amount) {
        return workListings[_workListingId].amount;
    }

    modifier OnlyCreator(uint256 _workListingId) {
        require(workListings[_workListingId].walletAddrress == msg.sender, "Only Creator can do this");
        _;
    }

    receive() external payable {}
    fallback() external payable {}
}