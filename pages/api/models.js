import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    const modelsPath = path.resolve('./weights');
    console.log({modelsPath})

    // Read all model files from the 'models' directory
    const files = fs.readdirSync(modelsPath);

    console.log(files);

    // Serve each model file individually
    files.forEach((file) => {
        const filePath = path.join(modelsPath, file);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res, { end: false });
    });

    // Signal the end of the response
    res.end();
}
