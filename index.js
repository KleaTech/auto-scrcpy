const execSync = require('child_process').execSync;

execSync('adb disconnect');
const adbMdnsResults = execSync('adb mdns services').toString().trim().split('\n');
const noOfDevices = execSync('adb devices').toString().trim().split('\n');
if (noOfDevices.length > 1) {
    console.log('Device is already added.')
} else {
    console.log(`Found ${adbMdnsResults.length - 1} device(s), using the first one...`);
    const address = adbMdnsResults[1].split('\t')[2];
    console.log(`Connecting to ${address}`);
    const result = execSync(`adb connect ${address}`).toString();
    if (result.toLowerCase().includes('failed to connect to')) {
        console.log('Try turning wireless debugging off and on again. Or maybe device is not paired');
        process.exit(1);
    }
}
setTimeout(() => execSync(`scrcpy -m 1600`), 1000);
