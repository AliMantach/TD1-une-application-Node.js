import { helloWorld } from './hello-world';
import { getSystemInfo } from './sysinfo';


const greet = helloWorld();
console.log(greet);

const main = async (): Promise<void> => {
  try {
    const systemInfo = await getSystemInfo();
    console.log(systemInfo);
  } catch (error) {
    console.error('Error retrieving system information:', error);
    process.exit(1);
  }
};

main();
