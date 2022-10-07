import * as fs from 'fs';

const loadPackage = async () => {
  const packageJson = fs.readFileSync('./package.json').toString();

  const packages = JSON.parse(packageJson);

  for (const name of Object.keys(packages.dependencies)) {
    console.log(name, ':', packages.dependencies[name]);

    // if (name === "vue") {
    //   packages.dependencies[name] = "^3.0.0"
    //   continue;
    // }

    packages.dependencies[name] = '*';
  }

  for (const name of Object.keys(packages.devDependencies)) {
    console.log('dev', name, ':', packages.devDependencies[name]);

    // if (name === 'vite' || name === '@vitejs/plugin-vue') {
    //   packages.devDependencies[name] = "^2.0.0"
    //   continue;
    // }

    packages.devDependencies[name] = '*';
  }

  await fs.writeFileSync('./package.json', JSON.stringify(packages, null, 2));
};

loadPackage();
