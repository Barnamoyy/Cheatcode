export const getFontSize = () => {
    const fontSize = localStorage.getItem('fontSize');
    return fontSize ? parseInt(fontSize, 10) : 12;
}

export const setFontSize = (size: number) => {
    localStorage.setItem('fontSize', size.toString());
}