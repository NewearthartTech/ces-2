import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const NowOrLaterDeployment: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("NowOrLater", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
  });

  // Get the deployed contract
  const nowOrLater = await hre.ethers.getContract("NowOrLater", deployer);
  console.log("Contract has been deployed on", nowOrLater.address);
};

export default NowOrLaterDeployment;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
NowOrLaterDeployment.tags = ["NowOrLater"];
