import { run, logger, fs, cp, network } from 'kabuda-nodejs-tools';

/**
 */
async function deployAppEngine() {

    let deployment = process.argv[2];
    if (!deployment) {
        console.error('Must specify deployment directory');
        return;
    }
    
    let configFilename = process.argv[3];
    if (!configFilename) {
        console.error('Must specify deployment config filename (in configs/), such as "app.yaml"');
        return;
    }

    await cp.execSpawn('rm -rf deployments/' + deployment);

    // move to root 
    process.chdir('../');

    logger.log('Build and copy server');
    process.chdir('server/');
    await cp.execSpawn('npm run build');
    process.chdir('../');
    await fs.copyDir('server/build', 'deploy/deployments/' + deployment);


    logger.log('Build and copy assets');
    process.chdir('client/');
    await cp.execSpawn('npm run render-static');
    process.chdir('../');
    await fs.copyDir('client/build/public', 'deploy/deployments/' + deployment + '/public');


    logger.log('Copy app.yaml');
    fs.copyFile('deploy/configs/' + configFilename, 'deploy/deployments/' + deployment + '/app.yaml');
    fs.copyFile('deploy/configs/key.json', 'deploy/deployments/' + deployment + '/key.json');


    logger.log('Finished preparing in deployments/' + deployment);
}


run(deployAppEngine);
