//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract SimpleStorage {
    string private _data;

    event DataSet(address indexed account, string _data);

    constructor(string memory data_) {
        _data = data_;
    }

    function getData() public view returns (string memory) {
        return _data;
    }

    function setData(string memory data_) public {
        _data = data_;
        emit DataSet(msg.sender, data_);
    }
}