const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toString());

    //Sending a few waves

    let waveTxn = await waveContract.wave("HELLLOO!!!");
    await waveTxn.wait();


    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("YOoo");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    let wavers = await waveContract.getTotalWavers();
    
    let allWaves = await waveContract.getAllWaves();  
    console.log(allWaves);
};

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