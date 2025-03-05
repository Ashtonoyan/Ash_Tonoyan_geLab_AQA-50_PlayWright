import {faker} from '@faker-js/faker';
import * as path from 'path';
import {promises as fs} from 'fs';


export async function generateFile(): Promise<{ fileName: string, filePath: string }> {
    const directory = path.join(__dirname, '..', '..', '..', 'files')
    try {
        await fs.access(directory);
    } catch (error) {
        await fs.mkdir(directory, {recursive: true});
        console.log(`Directory created: ${directory}`);
    }
    const fileName = `file_AT_C2256_${faker.string.uuid()}.txt`;
    const filePath = path.join(directory, fileName);
    const fileContent = faker.lorem.sentences(5);
    await fs.writeFile(filePath, fileContent);

    return {fileName, filePath};

}

export async function deleteGenerateFile(filePath: string) {
    try {
        await fs.access(filePath);
        await fs.unlink(filePath);
    } catch (error) {
        console.log(`File not found: ${filePath}`);
    }
}