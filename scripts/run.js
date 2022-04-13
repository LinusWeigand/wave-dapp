const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();

    const waveContract = await deploy(owner);

    /* 
     * Get contract balance
     */
    await printBalance(waveContract);
    await printTotalWaves(waveContract);

    //Sending a few waves
    await sendExampleMessages(waveContract, owner, randomPerson);

    await printAllWaves(waveContract);
    await printTotalWaves(waveContract);
    await printBalance(waveContract);
};

const deploy = async (owner) => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.2"),
    });
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    return waveContract;
}

const sendExampleMessages = async (waveContract, owner, randomPerson) => {
    let waveTxn = await waveContract.wave("A message!!!");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomPerson).wave("YOoo");
    await waveTxn.wait();
}

const printAllWaves = async (waveContract) => {
    let allWaves = await waveContract.getAllWaves();  
    console.log(allWaves);
}

const printBalance = async (waveContract) => {
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );

    console.log(
        "Contract balance:", 
        hre.ethers.utils.formatEther(contractBalance)
    );
}

const printTotalWaves = async (waveContract) => {
    let waveCount = await waveContract.getTotalWaves();
    console.log("Total waves: ", waveCount.toNumber());
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();