async function openFile() {
    try {
        // Abrir o seletor de arquivo
        const [fileHandle] = await window.showOpenFilePicker();

        // Acessar o arquivo
        const file = await fileHandle.getFile();

        // Ler o conteúdo do arquivo como texto
        const contents = await file.text();

        console.log(contents);
    } catch (err) {
        console.error("Erro ao abrir o arquivo:", err);
    }
}
async function openDirectory() {
    if (!window.showDirectoryPicker) {
        console.error("Browser does not support the File System Access API");
        return;
    }
    try {
        // Abrir o seletor de diretório
        const directoryHandle = await window.showDirectoryPicker();

        // Iterar sobre os arquivos no diretório
        for await (const [name, handle] of directoryHandle.entries()) {
            console.log(name, handle);
        }
    } catch (err) {
        console.error("Erro ao abrir o diretório:", err);
    }
}