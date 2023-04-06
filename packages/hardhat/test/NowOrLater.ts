import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { NowOrLater } from "../typechain-types";

describe("Now or later", function () {
  let nowOrLater: NowOrLater;
  let ownerAccount: SignerWithAddress;
  let creatorAccount: SignerWithAddress;
  let applicantAccount: SignerWithAddress;

  before(async () => {
    const [owner, creator, applicant] = await ethers.getSigners();
    ownerAccount = owner;
    creatorAccount = creator;
    applicantAccount = applicant;

    const NowOrLater = await ethers.getContractFactory("NowOrLater");
    nowOrLater = (await NowOrLater.deploy()) as NowOrLater;
    await nowOrLater.deployed();
  });

  describe("Deployment Now or later", function () {
    it("Should have the right owner", async function () {
      expect(await nowOrLater.owner()).to.equal(ownerAccount.address);
    });
  });

  describe("Transactions", function () {
    it("Should be able to create a work listing", async function () {
      await expect(await nowOrLater.connect(creatorAccount).CreateWorkListing({ value: ethers.utils.parseEther("4") }))
        .to.emit(nowOrLater, "Created_WorkListing")
        .withArgs(0, creatorAccount.address, await ethers.provider.getBalance(nowOrLater.address), false);
    });

    it("Should be able to pay applicant", async function () {
      await expect(
        await nowOrLater
          .connect(creatorAccount)
          .PayApplication(0, applicantAccount.address, ethers.utils.parseEther("2"), true),
      )
        .to.emit(nowOrLater, "Paid_Applicant")
        .withArgs(0, applicantAccount.address, await nowOrLater.getWorkListingAmount(0), true);
    });

    it("Should complete the payment", async function () {
      await expect(
        await nowOrLater
          .connect(creatorAccount)
          .PayApplication(0, applicantAccount.address, ethers.utils.parseEther("2"), false),
      )
        .to.emit(nowOrLater, "Paid_Applicant")
        .withArgs(0, applicantAccount.address, await nowOrLater.getWorkListingAmount(0), false);
    });

    it("Should failed to pay applicant if not creator", async function () {
      await expect(
        nowOrLater
          .connect(ownerAccount)
          .PayApplication(0, applicantAccount.address, ethers.utils.parseEther("2"), true),
      ).to.revertedWith("Only Creator can do this");
    });
  });
});
